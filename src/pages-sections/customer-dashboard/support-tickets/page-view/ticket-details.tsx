"use client";

import { Fragment } from "react";
// Local CUSTOM COMPONENTS
import MessageForm from "../message-form";
import ConversationCard from "../conversation-card";
import DashboardHeader from "../../dashboard-header";
// CUSTOM ICON COMPONENT
import CustomerService from "icons/CustomerService";
import { useDashboardStore } from "store/dashboard";

export default function TicketDetailsPageView({ id }: { id: string }) {
  const { profile } = useDashboardStore();
  const { messages } = profile;
  const message = messages?.find((m) => m.id === id) || null;

  const token = profile.token;

  return (
    <Fragment>
      {/* TITLE HEADER AREA */}
      <DashboardHeader
        title="Support Ticket"
        Icon={CustomerService}
        href="/support-tickets"
        buttonText="Back to Tickets"
      />

      {/* CONVERSATION LIST */}
      <ConversationCard message={{
        name: message?.name as string,
        imgUrl: profile.genericResponseUser.image as string,
        text: message?.message as string,
        createdAt: message?.consultedAt as string,
        from: 'user'
      }} />
      {message?.conversation?.map((item, ind) => (
        <ConversationCard message={item} key={ind} />
      ))}

      {/* FORM AREA */}
      <MessageForm token={token as string} messageId={id}/>
    </Fragment>
  );
}
