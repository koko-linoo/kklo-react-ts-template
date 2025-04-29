import "@mantine/core/styles.css";

import { theme } from "@/configs/theme";

import { router } from "@/configs/routes";
import { MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <MantineProvider theme={theme}>
      <ModalsProvider modalProps={{ centered: true }}>
        <RouterProvider router={router} />
      </ModalsProvider>
    </MantineProvider>
  </QueryClientProvider>
);
