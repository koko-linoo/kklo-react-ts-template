import { useAuthStore } from "@/stores/auth.store";
import { Button, Center } from "@mantine/core";
import { Navigate } from "react-router-dom";

export function Login() {
  const user = useAuthStore((state) => state.user);
  const login = useAuthStore((state) => state.login);

  const handleLogin = () => {
    login({
      id: 1,
      name: "John Doe",
      email: "john@doe.com",
      accessToken: "123456789",
      password: "123456789",
    });
  };

  if (user) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <Center h="100vh" w="100vw">
      <Button onClick={handleLogin} variant="outline">
        Login
      </Button>
    </Center>
  );
}
