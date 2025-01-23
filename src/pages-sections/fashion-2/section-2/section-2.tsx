"use client"
import Container from "@mui/material/Container";
// GLOBAL CUSTOM COMPONENT
import ServiceCard3 from "components/service-cards/service-card-3";
// STYLED COMPONENTS
import { RootStyle } from "./styles";
// API FUNCTIONS
import api from "utils/__api__/fashion-2";
import { useEffect, useState } from "react";
import Service from "models/Service.model";

export default function Section2({className}: {className: string}) {
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    const fetchServices = async () => {
      const services = await api.getServices();
      setServices(services);
    };

    fetchServices();
  }, []);

  return (
    <Container className={`mt-2 ${className}`}>
      <RootStyle>
        {services.map(({ id, icon, title, description }) => (
          <ServiceCard3 key={id} icon={icon} title={title} description={description} />
        ))}
      </RootStyle>
    </Container>
  );
}
