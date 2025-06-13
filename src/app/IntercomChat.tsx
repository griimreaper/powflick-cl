'use client';

import { useEffect } from 'react';
import Script from 'next/script';

const IntercomChat = () => {
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      @media (max-width: 768px) {
        .intercom-lightweight-app-launcher {
          bottom: 80px !important;
        }
        .intercom-namespace {
          bottom: 70px !important;
        }
      }
    `;
    document.head.appendChild(style);

    const applyCustomPosition = () => {
      if (window.innerWidth > 768) return;

      const launcher = document.querySelector('.intercom-lightweight-app-launcher') as HTMLElement;
      if (launcher) launcher.style.bottom = '80px';

      const container = document.querySelector('.intercom-namespace') as HTMLElement;
      if (container) container.style.bottom = '70px';

      // Aplica estilos al hijo específico
      const innerElem = container?.querySelector('.intercom-with-namespace-jostpl') as HTMLElement;
      if (innerElem) {
        Object.assign(innerElem.style, {
          position: 'absolute',
          top: '-60px',
        });
      }
    };

    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        for (const node of Array.from(mutation.addedNodes)) {
          if (node instanceof HTMLElement) {
            if (node.classList.contains('intercom-namespace') || node.querySelector('.intercom-namespace')) {
              applyCustomPosition();
            }
            if (node.classList.contains('intercom-with-namespace-jostpl') || node.querySelector('.intercom-with-namespace-jostpl')) {
              applyCustomPosition();
            }
          }
        }
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });

    // Aplica al inicio por si ya están
    applyCustomPosition();

    return () => {
      document.head.removeChild(style);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <Script
        id="intercom"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: `
            window.intercomSettings = {
              app_id: "bl6qh5ik"
            };
            (function() {
              var w = window;
              var ic = w.Intercom;
              if (typeof ic === "function") {
                ic("reattach_activator");
                ic("update", w.intercomSettings);
              } else {
                var d = document;
                var i = function() {
                  i.c(arguments);
                };
                i.q = [];
                i.c = function(args) {
                  i.q.push(args);
                };
                w.Intercom = i;
                var l = function() {
                  var s = d.createElement("script");
                  s.type = "text/javascript";
                  s.async = true;
                  s.src = "https://widget.intercom.io/widget/bl6qh5ik";
                  var x = d.getElementsByTagName("script")[0];
                  x.parentNode.insertBefore(s, x);
                };
                if (document.readyState === "complete") {
                  l();
                } else if (w.attachEvent) {
                  w.attachEvent("onload", l);
                } else {
                  w.addEventListener("load", l, false);
                }
              }
            })();
          `,
        }}
      />
    </>
  );
};

export default IntercomChat;
