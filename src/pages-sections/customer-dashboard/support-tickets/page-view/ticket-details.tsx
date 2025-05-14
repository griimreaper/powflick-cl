"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import MessageForm from "../message-form";
import ConversationCard from "../conversation-card";
import DashboardHeader from "../../dashboard-header";
import CustomerService from "icons/CustomerService";
import { useDashboardStore } from "store/dashboard";
import { Message } from "models/types";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllMessagesByUser } from "services/dashboardAdmin/messages";

export default function TicketDetailsPageView({ id, message }: { id: string, message?: Message }) {
  const { profile } = useDashboardStore();
  const token = profile.token;
  const queryClient = useQueryClient();
  const scrollRef = useRef<HTMLDivElement>(null);

  const { data: messages } = useQuery<Message[]>({
    queryKey: ["messages"],
    queryFn: () => getAllMessagesByUser(token!),
    refetchOnMount: true,
    enabled: !!token,
    staleTime: 0,
    initialData: () => queryClient.getQueryData(["messages"]),
  });

  const [mess, setMess] = useState<Message | null>(message || null);

  // Establece el mensaje cuando las messages estén disponibles
  useEffect(() => {
    if (!message && messages) {
      const found = messages.find((m) => m.id === id);
      if (found) {
        setMess(found);
      }
    }
  }, [messages, id, message]);

  const from = message ? "admin" : "user";

  // Hacer scroll al final cuando se actualizan los mensajes
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [mess]);

  return (
    <Fragment>
      {from === "admin" ? (
        <div style={{ marginTop: "24px" }}>
          <DashboardHeader title="Support" Icon={CustomerService} />
        </div>
      ) : (
        <DashboardHeader
          title="Support"
          Icon={CustomerService}
          href="/support-tickets"
          buttonText={"Back to Tickets"}
        />
      )}

      <div
        ref={scrollRef}
        style={{
          maxHeight: "400px",
          overflowY: "auto",
          padding: "1rem",
          borderRadius: "8px",
          marginBottom: "6px",
          backgroundColor: "white",
        }}
      >
        <ConversationCard
          message={{
            name: mess?.name as string,
            imgUrl: profile.genericResponseUser.image as string,
            text: mess?.message as string,
            createdAt: mess?.consultedAt as string,
            from: "user",
          }}
        />
        {mess?.conversation?.map((item, ind) => (
          <ConversationCard message={item} key={ind} />
        ))}
      </div>

      <MessageForm token={token as string} messageId={id} setMess={setMess} from={from} />
    </Fragment>
  );
}
