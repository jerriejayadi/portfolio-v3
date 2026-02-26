import { defineField, defineType } from "sanity";

export const profile = defineType({
  name: "profile",
  title: "Profile",
  type: "document",
  // Singleton: only one profile document should exist
  fields: [
    defineField({
      name: "content",
      title: "Content",
      type: "markdown",
      description: "Your 'About Me' content written in Markdown.",
    }),
  ],
});

