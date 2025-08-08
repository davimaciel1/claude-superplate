import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components"
import * as React from "react"

interface WelcomeEmailProps {
  userFirstname: string
  loginUrl: string
}

export const WelcomeEmail = ({
  userFirstname,
  loginUrl,
}: WelcomeEmailProps) => (
  <Html>
    <Head />
    <Preview>
      Welcome to Claude Superplate - Let's get started!
    </Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>Welcome to Claude Superplate!</Heading>
        <Text style={text}>Hi {userFirstname},</Text>
        <Text style={text}>
          We're excited to have you on board. Claude Superplate is the most
          complete Next.js boilerplate that helps you ship your SaaS 10x
          faster.
        </Text>
        <Text style={text}>
          Here's what you can do with Claude Superplate:
        </Text>
        <ul>
          <li>Build and deploy production-ready applications</li>
          <li>Manage users and teams</li>
          <li>Process payments with Stripe</li>
          <li>Send transactional emails</li>
          <li>And much more!</li>
        </ul>
        <Section style={buttonContainer}>
          <Button style={button} href={loginUrl}>
            Get Started
          </Button>
        </Section>
        <Text style={text}>
          If you have any questions, feel free to reach out to our support
          team.
        </Text>
        <Text style={text}>
          Happy building!
          <br />
          The Claude Superplate Team
        </Text>
      </Container>
    </Body>
  </Html>
)

const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
}

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
  width: "560px",
}

const h1 = {
  color: "#333",
  fontSize: "24px",
  fontWeight: "600",
  lineHeight: "24px",
  margin: "40px 0",
  padding: "0",
}

const text = {
  color: "#333",
  fontSize: "14px",
  lineHeight: "24px",
  margin: "16px 0",
}

const buttonContainer = {
  padding: "27px 0 27px",
}

const button = {
  backgroundColor: "#8b5cf6",
  borderRadius: "8px",
  color: "#fff",
  fontSize: "14px",
  fontWeight: "600",
  lineHeight: "24px",
  padding: "10px 20px",
  textDecoration: "none",
  textAlign: "center" as const,
}