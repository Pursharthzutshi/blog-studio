# BlogStudio ✍️

> An AI-powered blog platform where you can write blogs manually, generate them instantly with AI, edit with smart AI rewrites, ask questions across your entire blog library using RAG, and get deep content analysis — all in one place.

---

## What This Project Does

BlogStudio is a full-stack Next.js blog platform that combines traditional writing tools with cutting-edge AI capabilities:

1. **Write blogs manually** — A clean editor to craft and publish blog posts by hand.
2. **Generate blogs with AI (AI Studio)** — Describe a topic and the AI writes a complete, professional blog post using an OpenRouter-backed LLM, then stores it automatically.
3. **Smart AI rewrite** — Highlight any section of a blog and let the AI expand and improve it in place.
4. **Ask AI questions** — A RAG-powered Q&A panel that searches across all your blogs using hybrid search (vector similarity + full-text) and answers natural-language questions grounded in your actual content.
5. **Blog analysis** — Get a concise AI-written content analysis of any blog post.
6. **Explore all blogs** — Browse and manage all published blogs in one page.
7. **Authentication** — Secure account creation, login, and session management with JWT.

---

## Key Features

| Feature | Description |
|---|---|
| ✍️ **Manual Writing** | Write and publish blog posts with a clean, minimal editor |
| 🤖 **AI Blog Generation** | Provide a title and topic — get a full blog post written by AI via MCP |
| 🔁 **AI Rewrite** | Select any text in a blog and expand/improve it with AI |
| 💬 **Ask AI** | RAG-powered Q&A over your entire blog library |
| 📊 **Blog Analysis** | AI-generated content analysis with key takeaways and tone review |
| 🌐 **Explore Page** | Browse all published blogs with AI analysis overlays |
| 🔐 **Auth System** | JWT-based login, registration, and session management |
| 🗄️ **MongoDB + Vector Search** | Blog content stored in MongoDB Atlas with vector index for semantic search |

---

## Architecture

```
User
  │
  ▼
┌──────────────────────────────────────┐
│         Next.js App (App Router)     │
│  React 19 · Server Actions · JWT    │
└──────────────┬───────────────────────┘
               │
       ┌───────┴────────┐
       │                │
       ▼                ▼
 Server Actions      MCP Server (stdio)
 (auth, CRUD)        ┌──────────────────┐
                     │  create-blog     │  ← OpenRouter LLM generates content
                     │  rewrite-blog    │  ← LLM expands highlighted text
                     │  analyze-blog    │  ← LLM summarizes blog
                     │  all-blogs       │  ← Resource: lists all blogs
                     └────────┬─────────┘
                              │
                   ┌──────────┴──────────┐
                   │                     │
                   ▼                     ▼
             MongoDB Atlas          Vector Index
             (blog content,         (blog chunks +
              users, Q&A logs)       embeddings)
                   │
                   ▼
         RAG Q&A Pipeline
         Hybrid Search:
         • Vector similarity (Atlas $vectorSearch)
         • Full-text (Atlas $search text index)
                   │
                   ▼
           OpenRouter LLM
         (grounded AI answer)
```

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | [Next.js 16](https://nextjs.org/) (App Router, Server Actions) |
| **Language** | TypeScript |
| **UI** | React 19, Vanilla CSS |
| **Markdown** | `react-markdown` |
| **AI / LLM** | [OpenRouter](https://openrouter.ai/) (configurable model) |
| **Embeddings** | OpenRouter embedding API |
| **Database** | [MongoDB Atlas](https://www.mongodb.com/atlas) via Mongoose |
| **Vector Search** | MongoDB Atlas Vector Search (`$vectorSearch`) |
| **Full-text Search** | MongoDB Atlas Search (`$search`) |
| **Tool Protocol** | Model Context Protocol SDK (`@modelcontextprotocol/sdk`) |
| **Auth** | JWT (`jsonwebtoken`) + HTTP-only cookies |
| **Text chunking** | LangChain (`langchain`) |
| **Styling** | Tailwind CSS v4 |

---

## Project Structure

```
app/
├── (actions)/                   # Next.js Server Actions
│   ├── blog.ts                  # CRUD operations: insert, delete, update blogs; Q&A logging
│   ├── auth.ts                  # Login, register, logout server actions
│   ├── analyze.ts               # Blog analysis via MCP
│   ├── analyze-copy.ts          # Alternate analysis implementation
│   ├── createblogwithmcp.ts     # AI blog generation via MCP
│   ├── rewriteblogwithmcp.ts    # AI rewrite via MCP
│   ├── rag.ts                   # RAG Q&A entry point
│   └── connect-mcp.ts           # MCP client connection helper
├── mcp/
│   └── index.ts                 # MCP server — all tool/resource/prompt registrations:
│                                #   create-blog, rewrite-blog, analyze-blog,
│                                #   all-blogs (resource), prompt-analysis
├── lib/
│   └── dal/
│       ├── blog.ts              # DAL: MongoDB CRUD for blogs, chunks, Q&A
│       ├── rag.ts               # Chunks blog content + stores embeddings in MongoDB
│       └── openrouter.ts        # OpenRouter LLM + embedding API client
├── models/
│   └── db.ts                    # Mongoose schemas & models:
│                                #   blogSchema, blogChunkSchema,
│                                #   usersAccountSchema, blogAnalysisSchema,
│                                #   questionLogSchema
├── AddNewBlogPage/              # Manual blog writing page
├── AllBlogsPage/                # Explore all blogs page (with analysis overlay)
├── AskBlogQuestionPage/         # RAG-powered Q&A page
├── CreateBlogByMCP/             # AI blog generation page
├── AnalyzeBlog/                 # Blog content analysis page
├── DashboardPage/               # User dashboard
├── LandingPage/                 # Marketing landing page
├── LoginPage/                   # Login page
├── CreateNewAccount/            # Registration page
├── LogoutPage/                  # Logout page
├── blog/                        # Individual blog view
├── layout.tsx                   # Root layout with sidebar navigation
└── main.css                     # Global styles
```

---

## Database Schema (MongoDB)

### `blogScehma` — Blog posts
| Field | Type | Description |
|---|---|---|
| `uid` | String | Author user ID |
| `emailId` | String | Author email |
| `title` | String | Blog title |
| `description` | String | Full blog content |

### `blogChunks` — Vector store for RAG
| Field | Type | Description |
|---|---|---|
| `blogId` | ObjectId | Reference to parent blog |
| `description` | String | Text chunk |
| `embeddings` | Number[] | Embedding vector (for Atlas Vector Search) |

### `usersAccountSchema` — User accounts
| Field | Type | Description |
|---|---|---|
| `uid` | String | Unique user ID |
| `name` | String | Display name |
| `age` | Number | Age |
| `emailId` | String | Email address |
| `password` | String | Hashed password |

### `blogAnalysisSchema` — AI analysis results
| Field | Type | Description |
|---|---|---|
| `emailId` | String | Analyst email |
| `blogId` | String | Analyzed blog ID |
| `blogAnalysis` | String | AI-generated analysis text |

### `questionLogSchema` — Q&A history
| Field | Type | Description |
|---|---|---|
| `uid` | String | User ID |
| `emailId` | String | User email |
| `userQuestion` | String | The question asked |
| `aiResponse` | String | AI's answer |

---

## RAG Pipeline (How Ask AI Works)

1. **Ingestion** — When a blog is created (manually or via AI), the content is split into chunks by LangChain and each chunk is embedded using the OpenRouter embedding API.
2. **Storage** — Chunks + embeddings are stored in MongoDB Atlas (`blogChunks` collection) with a **vector index** configured for `$vectorSearch`.
3. **Retrieval (Hybrid Search)** — When a user asks a question, two searches run in parallel:
   - **Vector search**: Atlas `$vectorSearch` finds the top 5 semantically similar chunks.
   - **Full-text search**: Atlas `$search` with `text` operator finds keyword matches.
4. **Fusion** — Both result sets are merged and deduplicated by `_id`.
5. **Generation** — The combined context is passed to the OpenRouter LLM. If the context is relevant, the AI answers from it. If not, it answers from general knowledge and notes the gap.
6. **Logging** — Every question and answer is saved to the `questionLogSchema` collection for history.

---

## Getting Started

### Prerequisites

- Node.js 18+
- A [MongoDB Atlas](https://www.mongodb.com/atlas) cluster with:
  - **Vector Search index** on the `blogChunks` collection (`embeddings` field)
  - **Atlas Search index** on the `blogChunks` collection (`description` field)
- An [OpenRouter](https://openrouter.ai/) API key

### 1. Clone and install

```bash
git clone https://github.com/your-username/blogstudio.git
cd blogstudio/my-app
npm install
```

### 2. Configure environment variables

Create a `.env` file in the project root:

```env
# MongoDB
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/blogstudio

# JWT secret for auth
JWT_SECRET=your_super_secret_jwt_key

# OpenRouter (LLM + embeddings)
OPENROUTER_API_KEY=your_openrouter_api_key
```

### 3. Set up MongoDB Atlas indexes

In your Atlas cluster, create:

**Vector Search index** on `blogChunks.embeddings`:
```json
{
  "fields": [
    {
      "type": "vector",
      "path": "embeddings",
      "numDimensions": 1536,
      "similarity": "cosine"
    }
  ]
}
```

**Atlas Search index** on `blogChunks.description`:
```json
{
  "mappings": {
    "dynamic": false,
    "fields": {
      "description": { "type": "string" }
    }
  }
}
```

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Usage

| Page | Path | What you can do |
|---|---|---|
| Landing | `/LandingPage` | Project overview |
| Explore | `/AllBlogsPage` | Browse all published blogs, delete, view AI analysis |
| Write | `/AddNewBlogPage` | Write and publish a blog manually |
| AI Studio | `/CreateBlogByMCP` | Generate a blog with AI by providing title + topic |
| Ask AI | `/AskBlogQuestionPage` | Ask natural-language questions about your blog collection |
| Dashboard | `/DashboardPage` | Personal dashboard |
| Login | `/LoginPage` | Sign in to your account |
| Register | `/CreateNewAccount` | Create a new account |

---

## Deployment

Deploy to [Vercel](https://vercel.com/) with one command:

```bash
npm run build
vercel --prod
```

Add all environment variables from the `.env` section in your Vercel project settings.

---

## License

MIT
