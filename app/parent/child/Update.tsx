"use client";
import { Box, Container, Button } from "@mui/material";
import { Metadata } from "next";
import { useRouter } from "next/navigation";

export default function Update() {
  const router = useRouter();

  return (
    <Container>
      <Box height={100} mt={2}>
        <Button
          onClick={() => {
            router.push(`/parent?query='blah&page=${Math.random() * 10}`);
          }}
        >
          Update Search Parameter
        </Button>
        <Button
          onClick={() => {
            router.push(
              `/parent?query=${Math.random() * 10}&page=${Math.random() * 10}`
            );
          }}
        >
          Update Query Search Parameter
        </Button>
      </Box>
    </Container>
  );
}
