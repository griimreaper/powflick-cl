import Swal from "sweetalert2";

export const showSuccessAlert = (title: string, text: string) => {
  Swal.fire({
    toast: true,
    position: "top-end",
    title: title,
    text: text,
    icon: "success",
    showConfirmButton: false,
    timer: 3000,
  });
};

export const showErrorAlert = (title: string, text: string, timer = 3000) => {
  Swal.fire({
    toast: true,
    position: "top-end",
    title: title,
    text: text,
    icon: "error",
    showConfirmButton: false,
    timer,
  });
};

export const showLoader = (message: string) => {
  Swal.fire({
    title: "Loading...",
    html: `<div class="spinner-border" role="status"><span class="visually-hidden">${message}</span></div>`,
    allowOutsideClick: false,
    allowEscapeKey: false,
    allowEnterKey: false,
    showConfirmButton: false,
  });
};

let currentToast: any;

export const ToastWithProgress = (progress: any) => {
  console.log(progress);
  
  // Cierra el toast actual si existe
  if (currentToast) {
    Swal.close();
  }

  let timer: number;
  if (progress < 100) {
    // Establece el timer a un valor alto para evitar que se cierre automáticamente
    timer = 999999999;
  } else {
    // Cuando el progreso es 100%, cierra el toast después de un breve periodo
    timer = 1000; // 1 segundo para permitir que el usuario vea el progreso completado
  }

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: timer,
    timerProgressBar: true,
    didOpen: (toast) => {
      currentToast = toast;
      if (progress >= 100) {
        // Cierra el toast manualmente después de un breve periodo cuando el progreso es 100%
        setTimeout(() => {
          Swal.close();
          currentToast = null;
        }, 1000);
      }
    },
  });

  // Guarda la referencia al toast actual
  currentToast = Toast.fire({
    icon: "success",
    title: `Progreso: ${progress}%`,
  });
};

// Función para ocultar el loader
export const hideLoader = () => {
  Swal.close();
};
