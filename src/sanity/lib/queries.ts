import { defineQuery } from "next-sanity";

export const EXPERIENCES_QUERY =
  defineQuery(`*[_type == "experience"] | order(startDate desc) {
  "id": _id,
  role,
  company,
  "companyLogo": companyLogo.asset->url,
  "period": {
    "start": startDate,
    "end": endDate
  },
  description,
  skills,
  isCurrent
}`);

export const PROJECTS_QUERY =
  defineQuery(`*[_type == "project"] | order(startedAt desc) {
  "id": _id,
  title,
  "slug": slug.current,
  type,
  status,
  techStack,
  lastCommit,
  startedAt,
  description,
  "preview": {
    "title": title,
    "image": coalesce(thumbnail.asset->url, previewImage.asset->url),
    "description": description
  }
}`);

export const THOUGHTS_QUERY =
  defineQuery(`*[_type == "thought"] | order(publishedAt desc) {
  "id": _id,
  title,
  "slug": slug.current,
  "type": "Thought",
  publishedAt,
  snippet,
  "preview": {
    "description": snippet,
    "image": thumbnail.asset->url
  }
}`);

export const PROJECT_BY_SLUG_QUERY =
  defineQuery(`*[_type == "project" && slug.current == $slug][0] {
  "id": _id,
  title,
  "slug": slug.current,
  type,
  status,
  techStack,
  lastCommit,
  startedAt,
  description,
  content,
  "preview": {
    "image": coalesce(thumbnail.asset->url, previewImage.asset->url)
  }
}`);

export const THOUGHT_BY_SLUG_QUERY =
  defineQuery(`*[_type == "thought" && slug.current == $slug][0] {
  "id": _id,
  title,
  "slug": slug.current,
  "type": "Thought",
  publishedAt,
  snippet,
  content
}`);

export const PROFILE_QUERY = defineQuery(`*[_type == "profile"][0] {
  content
}`);

export const LABS_QUERY =
  defineQuery(`*[_type == "project" && type == "LABS"] | order(startedAt desc) {
  "id": _id,
  title,
  "slug": slug.current,
  type,
  status,
  techStack,
  lastCommit,
  startedAt,
  description,
  "preview": {
    "title": title,
    "image": coalesce(thumbnail.asset->url, previewImage.asset->url),
    "description": description
  }
}`);

export const LAB_BY_SLUG_QUERY =
  defineQuery(`*[_type == "project" && type == "LABS" && slug.current == $slug][0] {
  "id": _id,
  title,
  "slug": slug.current,
  type,
  status,
  techStack,
  lastCommit,
  description,
  content,
  "preview": {
    "image": coalesce(thumbnail.asset->url, previewImage.asset->url)
  }
}`);

