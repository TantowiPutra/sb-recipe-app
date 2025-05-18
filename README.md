Simple RecipeApp (FullStack App) made Using NextJS for Sanbercode Final Project
List of Dependencies:

SWR : Streamlined client-side fetching
Shadcn : Ready to use react Component
Tailwind : Utility-first CSS framework
Zod : Typescript Schema Declaration & Validation Library
Drizzle ORM : ORM to manage table migrations & simplified database query
Neon : Serverless PostgreSQL Database
Zustrand : Global State Management
Dependencies Usage:

SWR : Mainly used for Client-Side data fetching, allowing client-side to easily revalidate (mutation) links list after CRUD process.
Shadcn : Implemented built-in Card, Drawer, etc.
Tailwind: Using built in containers, margin, stc.
Zod: used on both client side and server action validation
Drizzle ORM: Creating database migrations, interacting with tables using ORM query
Neon : Serverless database
Terkadang halaman bisa gagal loading, dikarenakan Neon serverless PosgreSQL yang terkadang lemot :/
