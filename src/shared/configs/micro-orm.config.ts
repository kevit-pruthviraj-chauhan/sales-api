import { defineConfig } from "@mikro-orm/mongodb";

export default defineConfig({
  clientUrl: process.env.MONGODB_URL
})