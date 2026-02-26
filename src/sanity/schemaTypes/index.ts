import { type SchemaTypeDefinition } from "sanity";
import { project } from "./project";
import { thought } from "./thought";
import { experience } from "./experience";
import { profile } from "./profile";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [project, thought, experience, profile],
};

