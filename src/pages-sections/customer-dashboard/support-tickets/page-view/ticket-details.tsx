"use client";

import { Fragment, useState } from "react";
// Local CUSTOM COMPONENTS
import MessageForm from "../message-form";
import ConversationCard from "../conversation-card";
import DashboardHeader from "../../dashboard-header";
// CUSTOM ICON COMPONENT
import CustomerService from "icons/CustomerService";
import { useDashboardStore } from "store/dashboard";
import { Message } from "models/types";

export default function TicketDetailsPageView({ id, message }: { id: string, message?: Message }) {
  const { profile } = useDashboardStore();
  const { messages } = profile;
  const token = profile.token;

  const [mess, setMess] = useState(message || messages?.find((m) => m.id === id) || null);
  const from = message ? 'admin' : 'user';

  return (
    <Fragment>
      {/* TITLE HEADER AREA */}
      {from === 'admin' ?
        <div
          style={{
            marginTop: "24px", // Limita la altura del contenedor
          }}
        >
          <DashboardHeader
            title="Support"
            Icon={CustomerService}
          />
        </div>
        :
        <DashboardHeader
          title="Support"
          Icon={CustomerService}
          href="/support-tickets"
          buttonText={"Back to Tickets"}
        />
      }

      {/* CONVERSATION LIST */}
      <div
        style={{
          maxHeight: "400px", // Limita la altura del contenedor
          overflowY: "auto",  // Habilita el scroll vertical
          padding: "1rem",   // Opcional: espacio interno
          borderRadius: "8px", // Opcional: esquinas redondeadas
          marginBottom: "6px"
        }}
      >
        <ConversationCard message={{
          name: mess?.name as string,
          imgUrl: profile.genericResponseUser.image as string,
          text: mess?.message as string,
          createdAt: mess?.consultedAt as string,
          from: 'user'
        }} />
        {mess?.conversation?.map((item, ind) => (
          <ConversationCard message={item} key={ind} />
        ))}
      </div>
      {/* FORM AREA */}
      <MessageForm token={token as string} messageId={id} setMess={setMess} from={from} />
    </Fragment>
  );
}
