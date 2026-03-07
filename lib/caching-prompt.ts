// Generate a ~25k token system prompt for caching demo
// This needs to be large enough that caching savings are clearly visible

function generateSection(title: string, content: string): string {
  return `\n## ${title}\n\n${content}\n`;
}

const FLOSSK_CORE = `You are an expert assistant for FLOSSK (Free Libre Open Source Software Kosova), a non-profit organization that promotes open source software, open data, and digital rights in Kosovo and the Western Balkans region. You have been given an extensive knowledge base about FLOSSK, its projects, the Kosovo tech ecosystem, open source history, and related technical topics. Use this knowledge to answer questions accurately. If asked to output something verbatim, do so exactly.`;

const ABOUT_FLOSSK = `FLOSSK was founded in 2009 and is based in Prishtina, Kosovo. Their mission is to promote transparency, collaboration, and innovation through open source. They work with universities, government institutions, and international partners to advance digital literacy and open data policies across the Western Balkans.

FLOSSK's founding members include technology professionals, academics, and civil society advocates who recognized the potential of open source software to drive economic development and digital inclusion in Kosovo. The organization was established during a period when Kosovo's tech sector was just beginning to emerge, and open source provided an accessible pathway for local developers to participate in the global software community.

The organization operates under the principles of the Free Software Foundation and the Open Source Initiative, promoting the four essential freedoms: the freedom to run software for any purpose, the freedom to study how it works, the freedom to redistribute copies, and the freedom to distribute modified versions. These principles guide all of FLOSSK's activities, from software development workshops to policy advocacy.

FLOSSK is registered as a non-governmental organization under Kosovo law and maintains partnerships with similar organizations across the Balkans, including Open Labs Albania, Mozilla community groups in North Macedonia, and open data initiatives in Serbia and Montenegro. The organization is also a member of the European Open Source Software community and participates in EU-funded digital transformation projects.`;

const KEY_ACTIVITIES = `FLOSSK engages in a wide range of activities designed to promote open source adoption and digital literacy:

### Software Freedom Day
FLOSSK has organized Software Freedom Day (SFD) annually since 2009, making it one of the longest-running SFD events in Southeast Europe. The event typically features:
- Keynote presentations from international open source leaders
- Hands-on workshops covering Linux, web development, and data science
- Lightning talks from local developers sharing their open source contributions
- A hackathon component where participants build projects using open source tools
- Networking sessions connecting students with tech companies that use open source
- Panel discussions on digital rights, privacy, and internet freedom
- Exhibitions showcasing open source projects built by Kosovo developers

The Software Freedom Day event has grown from 30 attendees in 2009 to over 300 participants in recent years, reflecting the growing interest in open source within Kosovo's tech community.

### Workshops and Training Programs
FLOSSK runs regular workshops throughout the year, covering topics such as:
- Linux system administration and server management
- Web development with open source frameworks (React, Django, Laravel)
- Mobile app development with Flutter and React Native
- Data science and machine learning with Python, TensorFlow, and PyTorch
- DevOps practices using Docker, Kubernetes, and CI/CD pipelines
- Cybersecurity fundamentals and ethical hacking
- Blockchain technology and decentralized applications
- AI/ML engineering with large language models
- Database management with PostgreSQL and MongoDB
- Cloud computing with open source tools (OpenStack, CloudFoundry)

Each workshop series typically runs for 4-8 sessions over 2-4 weeks, with hands-on exercises and a final project. Workshop materials are published under Creative Commons licenses on FLOSSK's GitHub organization.

### Open Data Advocacy
FLOSSK actively advocates for open data policies in Kosovo's government institutions:
- Collaborated with the Ministry of Public Administration on the Open Government Partnership
- Helped establish Kosovo's first open data portal (opendata.rks-gov.net)
- Trained government officials on data publishing standards and formats
- Organized hackathons using government open data to build civic tech solutions
- Published reports on the state of open data in Kosovo
- Advocated for Freedom of Information legislation improvements
- Worked with municipalities to publish budget data in machine-readable formats
- Partnered with the World Bank on digital governance initiatives

### University Partnerships
FLOSSK collaborates with Kosovo's universities to integrate open source into computer science education:
- University of Prishtina: Guest lectures, thesis supervision, curriculum review
- UBT (University for Business and Technology): Joint hackathons and workshops
- AAB College: Web development bootcamps using open source tools
- University of Prizren: Data science workshops
- Rochester Institute of Technology Kosovo: Innovation lab partnerships

Through these partnerships, FLOSSK has helped introduce open source tools and practices to over 5,000 students since 2009. Many of these students have gone on to contribute to major open source projects and work at technology companies both locally and internationally.

### Software Localization
FLOSSK supports the localization of software into Albanian language:
- Coordinated the translation of Firefox into Albanian (over 95% complete)
- Organized LibreOffice translation sprints
- Supported WordPress Albanian localization
- Helped translate educational platforms like Khan Academy into Albanian
- Built glossaries of technical terms in Albanian to standardize translations
- Trained volunteer translators on localization tools and workflows

### Community Building
FLOSSK fosters the local tech community through:
- Monthly meetups and tech talks at Innovation Centre Kosovo
- Annual developer survey tracking trends in Kosovo's tech sector
- Job board connecting open source developers with companies
- Mentorship program pairing junior developers with experienced contributors
- Online community on Discord with over 1,200 members
- Newsletter covering open source news, events, and opportunities
- Social media presence sharing tech content and community updates`;

const ALBANIAN_BENCHMARK = `FLOSSK is currently building an open benchmark to evaluate AI models on Albanian language tasks. This is one of the first comprehensive AI benchmarks specifically designed for the Albanian language.

### Project Overview
The Albanian Language Model Benchmark aims to:
- Evaluate how well different AI models understand and generate Albanian text
- Identify strengths and weaknesses of various models for Albanian
- Provide a public resource for the Albanian NLP research community
- Establish baseline metrics for future model improvements
- Create a reference dataset of high-quality Albanian language tasks

### Benchmark Categories
The benchmark covers multiple categories to provide a comprehensive evaluation:

#### General Knowledge
- Questions about Albanian history, geography, culture, and current events
- Facts about Albania, Kosovo, and the Albanian diaspora
- Science and technology questions in Albanian context
- Questions requiring Albanian cultural understanding

#### Language Understanding
- Reading comprehension passages in Albanian
- Inference and reasoning tasks in Albanian
- Sentiment analysis of Albanian text
- Named entity recognition in Albanian news articles
- Word sense disambiguation for Albanian polysemous words

#### Translation
- English-to-Albanian translation quality assessment
- Albanian-to-English translation quality assessment
- Technical text translation accuracy
- Idiomatic expression translation
- Legal and official document translation

#### Generation
- Essay writing prompts on Albanian cultural topics
- Creative writing in Albanian
- Summarization of Albanian news articles
- Formal letter and document generation
- Social media content creation in Albanian

#### Reasoning
- Logical reasoning problems presented in Albanian
- Mathematical word problems in Albanian
- Commonsense reasoning tasks adapted for Albanian culture
- Analogical reasoning with Albanian language concepts

### Technical Architecture
The benchmark infrastructure uses:
- **Frontend**: Next.js 16 with App Router, React 19, Tailwind CSS 4
- **API Gateway**: OpenRouter for unified access to 200+ models
- **Observability**: Langfuse for tracing, cost tracking, and evaluation
- **Deployment**: Vercel for hosting and serverless functions
- **Database**: PostgreSQL for storing benchmark results and evaluation data
- **Authentication**: Clerk for user management and access control
- **UI Components**: shadcn/ui with custom warm editorial theme

### Evaluation Methodology
Each benchmark question includes:
- The question text in Albanian
- Expected answer or answer criteria
- Difficulty level (easy, medium, hard)
- Category and subcategory labels
- Evaluation metrics (exact match, BLEU, semantic similarity, human evaluation)
- Notes on common model failures for each question

Models are evaluated on:
- Accuracy: How correct are the model's answers?
- Fluency: How natural and grammatically correct is the Albanian output?
- Cultural awareness: Does the model understand Albanian cultural context?
- Consistency: Are answers consistent across similar questions?
- Reasoning: Can the model explain its reasoning in Albanian?`;

const WORKSHOP_SERIES = `The benchmark project includes a four-session workshop series designed to teach participants how to build AI-powered applications. Each session is 3 hours long and includes both theory and hands-on practice.

### Session 1: AI Fundamentals (completed)
**Duration**: 3 hours | **Participants**: 45 | **Date**: February 2026

Topics covered:
- Introduction to large language models and how they work
- The transformer architecture: attention, embeddings, and generation
- Tokenization: how models break text into pieces
- Prompt engineering basics: zero-shot, few-shot, chain-of-thought
- Temperature, top-p, and other sampling parameters
- Hands-on: Using AI assistants effectively for coding and research
- Comparison of different models: GPT-4, Claude, Gemini, Llama, Mistral
- Ethics and limitations of AI models
- The open vs closed source debate in AI
- Albanian language support across different models

Key takeaways for participants:
- Models don't "understand" language; they predict next tokens
- Prompt engineering is a skill that improves with practice
- Different models have different strengths and weaknesses
- Temperature controls creativity vs consistency in outputs

### Building with LLMs (this workshop)
**Duration**: 3 hours | **Participants**: 40 | **Date**: March 2026

Topics covered:
- API integration with OpenRouter: authentication, models, parameters
- Making your first API call and understanding the request/response format
- Streaming vs non-streaming responses and when to use each
- System prompts and how they shape model behavior (CRAFT framework)
- The CRAFT framework: Context, Role, Action, Format, Tone
- Observability with Langfuse: tracing, cost tracking, latency monitoring
- Why observability matters: debugging, optimization, cost control
- Prompt caching for cost optimization on repeated system prompts
- How caching works: cache write, cache read, TTL, minimum token requirements
- Tool calling and the ReAct pattern
- Giving models access to external functions (weather, time, databases)
- The ReAct loop: Reasoning + Acting in multiple steps
- RAG (Retrieval-Augmented Generation)
- Context injection vs full RAG pipeline
- When to use each approach
- Reasoning: enabling models to think step-by-step before answering
- Effort levels and when to use reasoning
- Interactive learning platform with live demos for each concept

The learning platform features:
- Interactive demos that make real API calls
- Side-by-side comparisons to see concepts in action
- Collapsible code viewers showing what's sent to the API
- Real-time cost and token tracking
- Dark mode support for comfortable viewing

### Session 3: Benchmark Building Day
**Duration**: 6 hours (full day) | **Planned Date**: March 2026

Planned activities:
- Participants create benchmark questions in their area of expertise
- Question quality criteria: unambiguous, verifiable, culturally relevant
- Building the evaluation pipeline: automated scoring, human review
- Multi-model comparison across different providers and model sizes
- Working in teams to cover different benchmark categories
- Peer review of questions for quality assurance
- Integration of questions into the benchmark platform
- Testing the evaluation pipeline with sample runs

Teams will be organized by category:
- Team 1: General Knowledge and History
- Team 2: Language Understanding and Reasoning
- Team 3: Translation and Generation
- Team 4: Science, Technology, and Culture

### Session 4: Final Presentations & Launch
**Duration**: 3 hours | **Planned Date**: April 2026

Planned activities:
- Teams present their benchmark categories and findings
- Analysis of model performance across Albanian language tasks
- Public launch of the benchmark website
- Discussion of results and future directions for Albanian NLP
- Awards for best benchmark questions and most interesting findings
- Planning for ongoing maintenance and expansion of the benchmark
- Media coverage and press release
- Open Q&A with participants and invited guests`;

const KOSOVO_TECH = `Kosovo's technology sector has experienced rapid growth over the past decade, becoming one of the country's most dynamic economic sectors.

### Overview
- Kosovo's ICT sector employs over 12,000 people
- The sector contributes approximately 8% to GDP
- Average IT salary in Kosovo: €800-1,500/month (significantly above national average)
- Major tech hubs: Prishtina, Prizren, Peja, Gjilan
- Over 1,000 registered IT companies
- Strong focus on outsourcing, product development, and startups

### Tech Education
- University of Prishtina's Faculty of Electrical and Computer Engineering
- UBT's Computer Science and Engineering program
- Multiple coding bootcamps (Gjirafa Labs, UNICEF Innovation Lab)
- Online learning platforms gaining popularity
- FLOSSK workshops supplementing formal education
- Growing culture of self-taught developers using open source resources

### Innovation Ecosystem
- Innovation Centre Kosovo (ICK): startup incubator and coworking space
- UNICEF Innovation Lab Kosovo: youth-focused tech programs
- Gjirafa: Kosovo's largest tech company (search engine, e-commerce)
- Starlabs: tech company building Kosovo's digital infrastructure
- Appsters: mobile app development and digital agency
- Kutia: software development company with global clients
- Growing venture capital interest in Kosovo startups

### Open Source in Kosovo
- Growing adoption of open source in government IT systems
- E-governance initiatives using open source platforms
- Universities increasingly teaching with open source tools
- FLOSSK as the primary community organization
- Regular open source events and meetups
- Contributions to international open source projects by Kosovo developers
- Kosovo developers active on GitHub with hundreds of public repositories

### Digital Infrastructure
- High internet penetration rate (over 90%)
- 4G coverage across major cities
- Fiber optic expansion underway
- Cloud adoption growing among businesses
- Data centers being established locally
- Mobile-first internet usage patterns similar to other developing nations

### Challenges
- Brain drain: talented developers leaving for Western Europe
- Limited funding for research and development
- Regulatory framework still developing
- International recognition issues affecting tech exports
- Need for more specialized education programs
- Gender gap in technology (though improving)
- Limited access to global payment systems and financial infrastructure`;

const OPEN_SOURCE_HISTORY = `Open source software has a rich history that spans over four decades and has fundamentally changed how software is developed, distributed, and used worldwide.

### The Origins (1970s-1980s)
The concept of freely sharing software predates the term "open source" by decades. In the early days of computing, software was often shared freely among researchers and institutions. The culture of sharing was particularly strong at MIT's AI Lab, where Richard Stallman worked.

In 1983, Richard Stallman launched the GNU Project with the goal of creating a completely free operating system. In 1985, he founded the Free Software Foundation (FSF) and published the GNU General Public License (GPL), which became the most widely used free software license. The GPL's key innovation was "copyleft" — the requirement that derivative works must also be free.

### The Linux Revolution (1990s)
In 1991, Linus Torvalds, a Finnish student, announced a free operating system kernel as a hobby project. Combined with GNU tools, Linux became a complete free operating system. The development model — thousands of contributors collaborating over the internet — was revolutionary.

Key events of the 1990s:
- 1993: Debian GNU/Linux founded, becoming the largest community distribution
- 1994: Red Hat Linux founded, pioneering commercial open source
- 1995: Apache HTTP Server released, eventually powering the majority of websites
- 1996: MySQL released, becoming the world's most popular open source database
- 1998: Netscape released its browser source code, a pivotal moment
- 1998: The term "open source" coined at a strategy session in Palo Alto
- 1998: Open Source Initiative (OSI) founded by Bruce Perens and Eric Raymond
- 1999: GNOME and KDE desktop environments matured

### The Enterprise Era (2000s)
Open source moved from counterculture to mainstream business strategy:
- 2004: Ubuntu Linux launched, making Linux accessible to everyday users
- 2005: Git version control system created by Linus Torvalds
- 2005: Ruby on Rails popularized open source web frameworks
- 2006: Amazon Web Services launched, building on open source infrastructure
- 2007: Android released, bringing Linux to billions of mobile devices
- 2008: GitHub launched, transforming collaborative development
- 2009: Node.js released, bringing JavaScript to server-side development
- 2009: FLOSSK founded in Kosovo, bringing open source advocacy to the Western Balkans

### The Cloud and AI Era (2010s-2020s)
Open source became the foundation of modern computing:
- Docker and Kubernetes revolutionized application deployment
- TensorFlow and PyTorch made AI/ML accessible to everyone
- React, Vue, and Angular transformed web development
- VS Code became the most popular code editor
- Hugging Face democratized access to AI models
- Open source AI models (Llama, Mistral, Stable Diffusion) challenged proprietary AI
- GitHub reaching 100+ million developers worldwide

### Open Source Principles
The Open Source Definition, maintained by OSI, requires software licenses to allow:
1. Free redistribution
2. Source code availability
3. Derived works
4. Integrity of the author's source code
5. No discrimination against persons or groups
6. No discrimination against fields of endeavor
7. Distribution of license
8. License must not be specific to a product
9. License must not restrict other software
10. License must be technology-neutral

### Impact on Kosovo and the Western Balkans
Open source has had a particularly significant impact on developing countries like Kosovo:
- Reduced software costs for businesses and government
- Provided learning resources for aspiring developers
- Enabled participation in the global software ecosystem
- Created employment opportunities in tech
- Fostered innovation without requiring large capital investments
- Built international connections through open source communities`;

const TECHNICAL_CONCEPTS = `This section covers key technical concepts that are relevant to FLOSSK's educational mission and the Albanian Language Model Benchmark project.

### Large Language Models (LLMs)
Large language models are AI systems trained on vast amounts of text data to understand and generate human language. Key concepts include:

**Architecture**: Modern LLMs are based on the Transformer architecture, introduced in the 2017 paper "Attention is All You Need." The transformer uses self-attention mechanisms to process input text in parallel, making it much faster than previous sequential architectures like RNNs and LSTMs.

**Training Process**: LLMs are trained in two main phases:
1. Pre-training: The model learns general language understanding from a large corpus of text (often trillions of tokens from the internet, books, and other sources)
2. Fine-tuning: The model is further trained on specific tasks or aligned with human preferences (RLHF - Reinforcement Learning from Human Feedback)

**Key Parameters**:
- Temperature: Controls randomness in output generation (0 = deterministic, 2 = very random)
- Top-p (nucleus sampling): Limits token selection to a cumulative probability threshold
- Max tokens: Maximum number of tokens in the response
- System prompt: Hidden instructions that shape model behavior
- Frequency/presence penalty: Reduce repetition in outputs

**Popular Models**:
- GPT-4 and GPT-4o by OpenAI: Strong general-purpose models
- Claude by Anthropic: Known for safety and long context handling
- Gemini by Google: Multimodal capabilities with text, image, and video
- Llama by Meta: Leading open source model family
- Mistral by Mistral AI: Efficient European open source models
- DeepSeek by DeepSeek AI: Strong reasoning capabilities
- Qwen by Alibaba: Multilingual models with good non-English performance

### API Integration
When building applications with LLMs, developers typically interact through APIs:

**Request Format** (OpenRouter-compatible):
A typical API request includes the model name, an array of messages (system, user, assistant roles), and parameters like temperature and max_tokens. The system message sets the behavior, user messages contain the input, and assistant messages contain the model's responses.

**Response Format**:
Responses include the model's output text, token usage statistics (input and output tokens), cost information, and metadata like the model version used and finish reason.

**Streaming**: For better user experience, APIs support streaming responses where tokens are sent as they're generated, rather than waiting for the complete response. This uses Server-Sent Events (SSE) format.

### Observability and Tracing
Monitoring LLM applications is crucial for:
- **Cost tracking**: Understanding token usage and API costs
- **Latency monitoring**: Measuring response times
- **Quality evaluation**: Assessing model output quality
- **Debugging**: Tracing issues through the request/response pipeline
- **A/B testing**: Comparing different models or prompt strategies

Langfuse is an open source observability platform specifically designed for LLM applications. It provides:
- Trace visualization showing the full request lifecycle
- Token and cost analytics with breakdowns by model and feature
- Evaluation metrics with human and automated scoring
- Dataset management for testing and benchmarking
- Integration with popular LLM frameworks

### Prompt Engineering
Effective prompts are essential for getting good results from LLMs:

**Zero-shot**: Give the model a task with no examples
**Few-shot**: Provide examples of the desired input/output format
**Chain-of-thought**: Ask the model to reason step by step
**CRAFT Framework**: Context, Role, Action, Format, Tone

### Tool Calling and the ReAct Pattern
LLMs can't interact with the world directly, but tool calling bridges this gap:
1. Define tools as JSON schemas (name, description, parameters)
2. Send the user's message along with tool definitions
3. The model decides which tools to call and with what arguments
4. Your code executes the tools and returns results
5. The model uses tool results to generate a final response

The ReAct (Reasoning + Acting) pattern enables multi-step problem solving where the model alternates between thinking about what to do and taking actions through tool calls.

### RAG (Retrieval-Augmented Generation)
RAG gives models access to custom knowledge:
1. **Context injection**: Paste text into the system prompt (simple, works for small datasets)
2. **Vector search**: Embed documents, store in vector DB, retrieve relevant chunks
3. **Hybrid search**: Combine vector similarity with keyword matching
4. **Reranking**: Use a second model to rerank retrieved chunks by relevance

### Prompt Caching
When sending the same system prompt repeatedly, prompt caching avoids reprocessing:
- The provider caches the tokenized prompt after the first request
- Subsequent requests with the same prompt prefix get a cache hit
- Cached tokens are typically 75-90% cheaper than uncached tokens
- Cache has a TTL (time to live) of typically 3-5 minutes
- Minimum token thresholds apply (usually 1024-4096 tokens)`;

const PROGRAMMING_LANGUAGES = `A comprehensive reference of programming languages commonly used in open source development and taught in FLOSSK workshops.

### Python
Python is a high-level, interpreted programming language known for its readability and versatility. Created by Guido van Rossum in 1991, Python has become one of the most popular languages worldwide. Key features include dynamic typing, automatic memory management, comprehensive standard library, support for multiple paradigms (procedural, object-oriented, functional), and extensive ecosystem of third-party packages through PyPI.

Python is particularly strong in data science (NumPy, Pandas, Matplotlib, Seaborn, Plotly), machine learning (TensorFlow, PyTorch, scikit-learn, Keras, XGBoost), web development (Django, Flask, FastAPI, Starlette), automation and scripting (Selenium, Beautiful Soup, Scrapy, Paramiko), scientific computing (SciPy, SymPy, Astropy), and natural language processing (NLTK, spaCy, Hugging Face Transformers).

Python's package manager pip and virtual environment tools (venv, conda, poetry) enable isolated development environments. The language follows the "batteries included" philosophy with a standard library covering file I/O, networking, JSON/XML processing, regular expressions, threading, multiprocessing, and much more.

### JavaScript and TypeScript
JavaScript is the language of the web, running in every browser and increasingly on servers through Node.js. Created by Brendan Eich at Netscape in 1995, it has evolved dramatically from a simple scripting language to a full-featured programming language used for complex applications.

TypeScript, developed by Microsoft, adds static typing to JavaScript, catching errors at compile time rather than runtime. It has become the standard for large-scale JavaScript applications and is used extensively in the React, Angular, and Vue ecosystems.

Key frameworks and libraries in the JavaScript ecosystem include React (UI component library by Meta), Next.js (full-stack React framework by Vercel), Angular (enterprise web framework by Google), Vue.js (progressive web framework), Svelte (compiler-based framework), Express.js (minimal Node.js web framework), NestJS (enterprise Node.js framework), Prisma (database ORM), Drizzle (TypeScript ORM), and Bun (fast JavaScript runtime alternative to Node.js).

The npm package registry hosts over 2 million packages, making it the largest software registry in the world. The JavaScript ecosystem moves quickly, with new frameworks and tools emerging regularly, making it both exciting and challenging for developers.

### Rust
Rust is a systems programming language focused on safety, speed, and concurrency. Developed by Mozilla Research, Rust prevents common programming errors like null pointer dereferences, buffer overflows, and data races at compile time through its ownership system and borrow checker. Rust has been voted the "most loved programming language" in Stack Overflow surveys for multiple years.

Key features include zero-cost abstractions, guaranteed memory safety without garbage collection, threads without data races, pattern matching, type inference, and minimal runtime. The language is increasingly used for web assembly, operating systems, game engines, embedded systems, and CLI tools.

### Go
Go (Golang) was created at Google by Robert Griesemer, Rob Pike, and Ken Thompson. It is designed for simplicity, efficiency, and concurrent programming. Go's goroutines and channels make concurrent programming straightforward. The language compiles to a single static binary, making deployment simple. Key tools in the Go ecosystem include Docker, Kubernetes, Terraform, Hugo, and CockroachDB.

### Java
Java remains one of the most widely used programming languages, particularly in enterprise environments. Created by James Gosling at Sun Microsystems in 1995, Java's "write once, run anywhere" philosophy enabled cross-platform development through the Java Virtual Machine (JVM). The Spring Framework ecosystem dominates enterprise Java development, while Android (though increasingly using Kotlin) still has a large Java codebase. Key frameworks include Spring Boot, Hibernate, Apache Kafka, Apache Spark, and Elasticsearch.

### C and C++
C, created by Dennis Ritchie at Bell Labs in 1972, remains fundamental to systems programming. The Linux kernel, most operating systems, and many embedded systems are written in C. C++ extends C with object-oriented features, templates, and the Standard Template Library (STL). It is widely used in game development (Unreal Engine), high-performance computing, real-time systems, and financial trading systems.

### PHP
PHP powers a significant portion of the web, with WordPress alone running over 40% of all websites. The Laravel framework has modernized PHP development with features like Eloquent ORM, Blade templating, and built-in authentication. Other notable PHP frameworks include Symfony, CodeIgniter, and CakePHP.

### Ruby
Ruby, created by Yukihiro "Matz" Matsumoto, is known for its elegant syntax and developer happiness philosophy. The Ruby on Rails framework revolutionized web development with its convention-over-configuration approach. While less prominent than in its peak years, Ruby remains popular for web applications and scripting.

### Kotlin
Kotlin, developed by JetBrains, is now the preferred language for Android development. It runs on the JVM, is fully interoperable with Java, and adds modern language features like null safety, coroutines, extension functions, and data classes.

### Swift
Swift, created by Apple, is used for iOS, macOS, watchOS, and tvOS development. It features type safety, optionals for null handling, protocol-oriented programming, and a clean syntax. Swift has also been open-sourced and is available for Linux server-side development.`;

const DATABASE_SYSTEMS = `A reference guide to database systems relevant to modern application development.

### Relational Databases

**PostgreSQL**: The most advanced open source relational database. Features include ACID compliance, advanced indexing (B-tree, Hash, GIN, GiST, BRIN), full-text search, JSON/JSONB support, window functions, common table expressions, materialized views, foreign data wrappers, and extensions like PostGIS for geospatial data and pgvector for vector similarity search. PostgreSQL is the database of choice for the FLOSSK benchmark project.

**MySQL/MariaDB**: The world's most popular open source database. MySQL was acquired by Oracle in 2010, leading to the creation of MariaDB as a community-maintained fork. Both are widely used in web applications, particularly with WordPress, Drupal, and other CMS platforms. Features include InnoDB storage engine with ACID compliance, replication, partitioning, and JSON support.

**SQLite**: A lightweight, serverless, zero-configuration database engine. Unlike other databases, SQLite is embedded directly into the application rather than running as a separate server process. It is the most widely deployed database engine in the world, found in every smartphone, browser, and countless applications. SQLite is ideal for prototyping, embedded systems, mobile apps, and small-to-medium websites.

### NoSQL Databases

**MongoDB**: A document-oriented database that stores data in flexible, JSON-like BSON documents. MongoDB excels at handling unstructured or semi-structured data, horizontal scaling through sharding, and rapid prototyping. Features include aggregation pipeline, change streams, Atlas Search, and multi-document ACID transactions.

**Redis**: An in-memory data structure store used as a database, cache, and message broker. Redis supports strings, hashes, lists, sets, sorted sets, bitmaps, hyperloglogs, and streams. It achieves sub-millisecond response times and is commonly used for session management, caching, real-time analytics, and pub/sub messaging.

**Elasticsearch**: A distributed search and analytics engine built on Apache Lucene. Elasticsearch provides full-text search, structured search, analytics, and logging capabilities. It is commonly paired with Kibana for visualization and Logstash for data pipeline processing (the ELK stack).

### Vector Databases

**Pinecone**: A managed vector database designed for machine learning applications. It provides fast similarity search, real-time updates, and automatic scaling. Used extensively in RAG applications, recommendation systems, and semantic search.

**Weaviate**: An open source vector database that combines vector search with structured filtering. Features include GraphQL API, multi-modal data support, and built-in vectorization modules.

**pgvector**: A PostgreSQL extension that adds vector similarity search. It allows storing embeddings alongside regular relational data, making it ideal for applications that need both traditional SQL queries and vector search. Supports L2 distance, inner product, and cosine distance metrics with IVFFlat and HNSW indexing.

**ChromaDB**: An open source embedding database designed for AI applications. Features include in-memory and persistent storage, automatic embedding, and filtering by metadata.

### Time-Series Databases

**InfluxDB**: Purpose-built for time-series data with high write throughput, data compression, and retention policies. Used for monitoring, IoT data, and real-time analytics.

**TimescaleDB**: A PostgreSQL extension for time-series data that provides automatic partitioning, continuous aggregates, and compression while maintaining full SQL compatibility.

### Graph Databases

**Neo4j**: The most popular graph database, using the Cypher query language. Ideal for social networks, knowledge graphs, fraud detection, and recommendation engines.

**ArangoDB**: A multi-model database supporting documents, key-value, graphs, and search in a single engine with a unified query language (AQL).`;

const DEVOPS_AND_CLOUD = `A comprehensive reference on DevOps practices and cloud computing technologies.

### Containerization

**Docker**: The platform that popularized containerization. Docker packages applications and their dependencies into portable containers that run consistently across environments. Key concepts include Dockerfiles (build instructions), images (read-only templates), containers (running instances), volumes (persistent storage), networks (container communication), and Docker Compose (multi-container orchestration).

A Dockerfile typically starts with a base image (FROM), copies application code (COPY), installs dependencies (RUN), exposes ports (EXPOSE), and defines the startup command (CMD or ENTRYPOINT). Best practices include using multi-stage builds to reduce image size, leveraging build cache effectively, running as non-root user, and using .dockerignore files.

**Kubernetes (K8s)**: The industry-standard container orchestration platform. Originally developed by Google and now maintained by the CNCF, Kubernetes automates deployment, scaling, and management of containerized applications. Key concepts include pods (smallest deployable units), services (network abstraction), deployments (declarative updates), StatefulSets (stateful applications), DaemonSets (node-level agents), ConfigMaps and Secrets (configuration), and Ingress (HTTP routing).

Kubernetes architecture consists of the control plane (API server, etcd, scheduler, controller manager) and worker nodes (kubelet, kube-proxy, container runtime). Popular managed Kubernetes services include Google GKE, Amazon EKS, Azure AKS, and DigitalOcean DOKS.

### CI/CD (Continuous Integration / Continuous Deployment)

**GitHub Actions**: GitHub's built-in CI/CD platform. Workflows are defined in YAML files and triggered by events (push, pull request, schedule, manual dispatch). Actions can build, test, and deploy code. The marketplace offers thousands of pre-built actions for common tasks.

**GitLab CI/CD**: GitLab's integrated pipeline platform. Pipelines are defined in .gitlab-ci.yml files with stages (build, test, deploy), jobs, and environments. Features include auto-DevOps, container registry, and environment-specific deployments.

**Jenkins**: The original open source CI/CD server. Highly extensible through plugins, Jenkins can automate virtually any build, test, and deployment workflow. While newer tools have simpler configurations, Jenkins remains popular in enterprises due to its flexibility and mature ecosystem.

### Infrastructure as Code

**Terraform**: HashiCorp's infrastructure as code tool for defining cloud resources in declarative configuration files. Terraform supports major cloud providers (AWS, GCP, Azure, DigitalOcean) and hundreds of other services through providers. Key concepts include resources, data sources, modules, state management, workspaces, and the plan/apply workflow.

**Ansible**: A configuration management and automation tool that uses YAML playbooks to define desired system state. Ansible is agentless (uses SSH), making it simple to set up. It excels at server provisioning, application deployment, and configuration management.

### Monitoring and Observability

**Prometheus**: An open source monitoring system with a multi-dimensional data model, PromQL query language, and powerful alerting. Prometheus scrapes metrics from instrumented applications and stores them in a time-series database. It is the standard for Kubernetes monitoring.

**Grafana**: An open source visualization and analytics platform. Grafana connects to various data sources (Prometheus, InfluxDB, Elasticsearch, PostgreSQL) and provides customizable dashboards, alerting, and exploration tools.

**Langfuse**: An open source LLM observability platform used in the FLOSSK benchmark project. Langfuse provides trace visualization, token and cost analytics, evaluation metrics, and dataset management specifically designed for LLM applications.

### Cloud Platforms

**Vercel**: A cloud platform optimized for frontend frameworks, especially Next.js. Features include automatic deployments from Git, serverless functions, edge functions, and CDN. The FLOSSK learning platform and benchmark website are deployed on Vercel.

**AWS (Amazon Web Services)**: The largest cloud provider offering 200+ services including compute (EC2, Lambda, ECS), storage (S3, EBS, EFS), databases (RDS, DynamoDB, ElastiCache), AI/ML (SageMaker, Bedrock), and networking (VPC, CloudFront, Route 53).

**Google Cloud Platform (GCP)**: Google's cloud offering with strengths in data analytics (BigQuery), AI/ML (Vertex AI), Kubernetes (GKE), and serverless computing (Cloud Functions, Cloud Run).

**Microsoft Azure**: Microsoft's cloud platform with strong enterprise integration. Features include Azure DevOps, Active Directory integration, and hybrid cloud capabilities.`;

const WEB_DEVELOPMENT = `A detailed reference on modern web development technologies and practices.

### Frontend Frameworks

**React**: A JavaScript library for building user interfaces, created by Meta. React uses a component-based architecture where UI is composed of reusable components that manage their own state. Key concepts include JSX (JavaScript XML syntax), hooks (useState, useEffect, useContext, useReducer, useMemo, useCallback, useRef), virtual DOM for efficient rendering, and unidirectional data flow.

React's ecosystem includes state management libraries (Redux, Zustand, Jotai, Recoil), routing (React Router, TanStack Router), form handling (React Hook Form, Formik), data fetching (TanStack Query, SWR, Apollo Client), animation (Framer Motion, React Spring), testing (React Testing Library, Vitest), and component libraries (shadcn/ui, Material UI, Chakra UI, Ant Design, Radix UI).

**Next.js**: A React framework by Vercel that provides server-side rendering (SSR), static site generation (SSG), incremental static regeneration (ISR), API routes, file-based routing, image optimization, and middleware. Next.js 16 (used in the FLOSSK project) features the App Router with React Server Components, nested layouts, loading states, error boundaries, and parallel routes.

The App Router uses a file-system based router where folders define routes and special files (page.tsx, layout.tsx, loading.tsx, error.tsx, not-found.tsx) define UI for each route segment. Server Components render on the server by default, while Client Components (marked with "use client") handle interactivity.

**Vue.js**: A progressive JavaScript framework that is incrementally adoptable. Vue 3 introduced the Composition API, which provides a more flexible way to organize component logic. The ecosystem includes Vue Router, Pinia (state management), Nuxt (meta-framework), and Vuetify (component library).

**Svelte**: A compiler-based framework that shifts work from the browser to the build step. Svelte components compile to highly efficient imperative code that directly manipulates the DOM. SvelteKit provides the meta-framework experience with SSR, routing, and more.

### CSS and Styling

**Tailwind CSS**: A utility-first CSS framework used in the FLOSSK learning platform. Tailwind CSS 4 features a Rust-based engine, automatic content detection, built-in import support, and container queries. The framework provides utility classes for every CSS property, enabling rapid UI development without writing custom CSS.

Key Tailwind concepts include responsive design (sm:, md:, lg:, xl:, 2xl: prefixes), dark mode (dark: prefix), hover/focus states (hover:, focus:, active: prefixes), custom themes (tailwind.config.js or CSS variables), and the @apply directive for extracting component classes.

**shadcn/ui**: A collection of reusable components built with Radix UI primitives and styled with Tailwind CSS. Unlike traditional component libraries, shadcn/ui components are copied into your project, giving you full control over their implementation. Used in the FLOSSK learning platform with a custom warm editorial theme using oklch colors.

### API Design

**REST (Representational State Transfer)**: The most common API architectural style. REST APIs use HTTP methods (GET, POST, PUT, PATCH, DELETE) to perform CRUD operations on resources identified by URLs. Best practices include versioning, consistent naming, proper status codes, pagination, filtering, and HATEOAS.

**GraphQL**: A query language for APIs developed by Facebook. GraphQL allows clients to request exactly the data they need, reducing over-fetching and under-fetching. Features include a strongly typed schema, real-time subscriptions, and introspection.

**tRPC**: End-to-end typesafe APIs for TypeScript applications. tRPC eliminates the need for code generation or runtime schemas by sharing types between client and server at compile time.

### Authentication and Authorization

**OAuth 2.0**: The industry standard protocol for authorization. OAuth 2.0 defines flows for web applications, mobile apps, and machine-to-machine communication. Common grants include Authorization Code (with PKCE), Client Credentials, and Device Code.

**JWT (JSON Web Tokens)**: A compact, self-contained token format for securely transmitting information between parties. JWTs consist of a header, payload, and signature. They are commonly used for API authentication and session management.

**Clerk**: An authentication and user management platform used in the FLOSSK benchmark project. Clerk provides pre-built UI components, social login, multi-factor authentication, and organization management.

### Performance Optimization

**Code Splitting**: Breaking application code into smaller chunks that are loaded on demand. Next.js performs automatic code splitting at the route level, and dynamic imports enable component-level splitting.

**Image Optimization**: Next.js Image component provides automatic resizing, format conversion (WebP, AVIF), lazy loading, and blur placeholders. Proper image optimization can significantly reduce page load times and bandwidth usage.

**Caching Strategies**: Browser caching (Cache-Control headers), CDN caching (edge caching), server-side caching (Redis, in-memory), and API response caching (stale-while-revalidate). Effective caching can dramatically improve application performance and reduce server costs.`;

const AI_AND_ML = `A comprehensive reference on artificial intelligence and machine learning concepts.

### Neural Network Architectures

**Transformers**: The dominant architecture for modern AI. The transformer model, introduced in "Attention Is All You Need" (Vaswani et al., 2017), uses self-attention mechanisms to process input sequences in parallel. The architecture consists of an encoder (for understanding input) and a decoder (for generating output), though many models use only one (BERT uses encoder-only, GPT uses decoder-only).

The self-attention mechanism computes attention scores between all pairs of tokens in a sequence, allowing the model to capture long-range dependencies. Multi-head attention runs multiple attention operations in parallel, each learning different aspects of the relationship between tokens.

**GPT (Generative Pre-trained Transformer)**: A decoder-only transformer architecture used for text generation. GPT models are trained with a causal language modeling objective — predicting the next token given all previous tokens. The series has progressed from GPT-1 (117M parameters) through GPT-2 (1.5B), GPT-3 (175B), GPT-4, and GPT-4o, with each generation showing significant capability improvements.

**BERT (Bidirectional Encoder Representations from Transformers)**: An encoder-only transformer trained with masked language modeling (predicting masked tokens from context). BERT and its variants (RoBERTa, ALBERT, DistilBERT, DeBERTa) are widely used for classification, named entity recognition, question answering, and sentence embedding tasks.

**Mixture of Experts (MoE)**: An architecture that uses multiple specialized "expert" networks with a gating mechanism that selects which experts to activate for each input. This allows scaling model capacity without proportionally increasing computation. Notable MoE models include Mixtral, DeepSeek V3, and Qwen 3.5.

### Training Techniques

**Pre-training**: Training a model on a large, general-purpose dataset to learn language patterns. Pre-training objectives include next-token prediction (GPT-style), masked language modeling (BERT-style), and denoising (T5-style). Pre-training datasets include Common Crawl, Wikipedia, books, code repositories, and curated internet content.

**Fine-tuning**: Adapting a pre-trained model to a specific task or domain using a smaller, task-specific dataset. Types include full fine-tuning (updating all parameters), LoRA (Low-Rank Adaptation, updating only small adapter layers), QLoRA (quantized LoRA for memory efficiency), and prefix tuning (learning soft prompt prefixes).

**RLHF (Reinforcement Learning from Human Feedback)**: A technique for aligning model outputs with human preferences. The process involves collecting human preference data (comparisons of model outputs), training a reward model on these preferences, and optimizing the language model against the reward model using PPO (Proximal Policy Optimization) or DPO (Direct Preference Optimization).

**Constitutional AI**: Anthropic's approach to AI safety where the model is trained with a set of principles (a "constitution") that guide its behavior. The model learns to critique and revise its own outputs according to these principles.

### Inference Optimization

**Quantization**: Reducing the precision of model weights from 32-bit floating point to lower precision formats (16-bit, 8-bit, 4-bit). This reduces memory usage and increases inference speed with minimal quality loss. Techniques include post-training quantization (PTQ), quantization-aware training (QAT), and GPTQ/AWQ for large language models.

**KV-Cache**: Caching the key and value tensors from the attention mechanism to avoid recomputation during autoregressive generation. This significantly speeds up inference for long sequences but requires substantial memory (proportional to sequence length, number of layers, and number of attention heads).

**Speculative Decoding**: Using a smaller, faster "draft" model to generate candidate tokens, then verifying them with the larger model in a single forward pass. This can achieve 2-3x speedup for autoregressive generation.

**Batching**: Processing multiple requests simultaneously to maximize GPU utilization. Continuous batching (dynamic batching) allows new requests to join an in-progress batch, improving throughput.

### Evaluation Metrics

**Perplexity**: Measures how well a model predicts a test set. Lower perplexity indicates better prediction. Formally, perplexity is the exponential of the average negative log-likelihood per token.

**BLEU (Bilingual Evaluation Understudy)**: Measures the quality of machine-translated text by comparing n-gram overlap with reference translations. BLEU scores range from 0 to 1, with higher scores indicating better translations.

**ROUGE (Recall-Oriented Understudy for Gisting Evaluation)**: Measures the quality of text summarization by comparing n-gram overlap between generated and reference summaries. Variants include ROUGE-N (n-gram overlap), ROUGE-L (longest common subsequence), and ROUGE-S (skip-bigram).

**MMLU (Massive Multitask Language Understanding)**: A benchmark that evaluates models across 57 subjects in STEM, humanities, social sciences, and other areas. MMLU is commonly used to compare general-purpose language model capabilities.

**HumanEval**: A benchmark for evaluating code generation capabilities. It contains 164 Python programming problems and measures the functional correctness of generated code.

### AI Safety and Ethics

**Alignment**: Ensuring AI systems act in accordance with human values and intentions. Key challenges include specifying what we want (value specification), ensuring the model understands what we want (value loading), and maintaining alignment as models become more capable.

**Hallucination**: When models generate plausible-sounding but factually incorrect information. Hallucination is a fundamental challenge because language models are trained to be fluent, not factual. Mitigation strategies include RAG, fact-checking, confidence calibration, and structured output with citations.

**Bias**: Systematic patterns in model outputs that reflect or amplify societal biases present in training data. Types include gender bias, racial bias, cultural bias, and linguistic bias. Evaluation and mitigation of bias is an active area of research.

**Privacy**: Concerns about models memorizing and potentially revealing personal information from training data. Techniques like differential privacy, data deduplication, and output filtering help mitigate privacy risks.`;

const NETWORKING_AND_PROTOCOLS = `### OSI Model Layers

**Layer 1 - Physical**: Deals with the physical transmission of raw data over a communication channel. Includes specifications for cables (Cat5e, Cat6, fiber optic), connectors (RJ45, SC, LC), signaling methods (baseband, broadband), and encoding schemes (Manchester, 4B/5B). The physical layer defines electrical voltages, timing of voltage changes, physical data rates, maximum transmission distances, and physical connectors.

**Layer 2 - Data Link**: Provides node-to-node data transfer and handles error correction from the physical layer. Divided into two sublayers: LLC (Logical Link Control) and MAC (Media Access Control). Key protocols include Ethernet (IEEE 802.3), Wi-Fi (IEEE 802.11), PPP (Point-to-Point Protocol), and HDLC. The data link layer uses MAC addresses for local addressing, implements frame synchronization, and handles flow control between adjacent nodes.

**Layer 3 - Network**: Responsible for packet forwarding including routing through intermediate routers. Key protocols include IP (IPv4 and IPv6), ICMP, OSPF, BGP, and RIP. The network layer handles logical addressing (IP addresses), path determination (routing), packet fragmentation and reassembly, and quality of service. IPv4 uses 32-bit addresses (4.3 billion possible) while IPv6 uses 128-bit addresses (3.4 × 10^38 possible).

**Layer 4 - Transport**: Provides end-to-end data transfer services. TCP provides reliable, ordered delivery with flow control and congestion control using mechanisms like slow start, congestion avoidance, fast retransmit, and fast recovery. UDP provides unreliable but fast delivery suitable for real-time applications. QUIC is a newer transport protocol built on UDP that provides multiplexed connections with reduced latency.

**Layer 5 - Session**: Manages sessions between applications. Handles session establishment, maintenance, and termination. Implements checkpointing and recovery mechanisms. Examples include RPC (Remote Procedure Call), NetBIOS, and PPTP.

**Layer 6 - Presentation**: Translates data between the application layer and the network. Handles data encryption/decryption (SSL/TLS), compression/decompression, and character encoding translation (ASCII, Unicode, EBCDIC). MIME types for email and web content are defined at this layer.

**Layer 7 - Application**: The layer closest to the end user, providing network services directly to applications. Key protocols include HTTP/HTTPS (web), SMTP/IMAP/POP3 (email), FTP/SFTP (file transfer), DNS (name resolution), DHCP (address assignment), SSH (remote access), SNMP (network management), and LDAP (directory services).

### TCP/IP Deep Dive

**TCP Three-Way Handshake**: Connection establishment uses SYN, SYN-ACK, ACK. The client sends a SYN with an initial sequence number (ISN), the server responds with SYN-ACK containing its own ISN and acknowledging the client's ISN+1, and the client sends an ACK acknowledging the server's ISN+1. This process takes one full round-trip time (RTT).

**TCP Flow Control**: Uses a sliding window mechanism. The receiver advertises a window size indicating how much data it can accept. The sender limits unacknowledged data to the window size. Window scaling (RFC 7323) allows windows larger than 64KB. Zero window probes prevent deadlock when the receiver's buffer is full.

**TCP Congestion Control**: Slow Start doubles the congestion window each RTT until reaching the slow start threshold. Congestion Avoidance increases the window linearly after the threshold. Fast Retransmit triggers retransmission after three duplicate ACKs. Fast Recovery allows the congestion window to recover without returning to slow start. Modern variants include CUBIC (Linux default), BBR (Google's bandwidth-based approach), and DCTCP (for data centers).

**DNS Resolution**: The process of resolving a domain name involves recursive and iterative queries. A client sends a query to its configured resolver. If the resolver doesn't have the answer cached, it queries root name servers, then TLD servers, then authoritative servers. DNS uses UDP port 53 for queries under 512 bytes and TCP for larger responses or zone transfers. DNSSEC adds cryptographic signatures to DNS records to prevent spoofing. DNS over HTTPS (DoH) and DNS over TLS (DoT) encrypt DNS queries for privacy.

**HTTP/2 and HTTP/3**: HTTP/2 introduced binary framing, multiplexing (multiple streams over a single connection), header compression (HPACK), server push, and stream prioritization. HTTP/3 replaces TCP with QUIC, providing built-in encryption, connection migration (survives IP address changes), independent stream flow control (eliminating head-of-line blocking), and 0-RTT connection resumption.

### Network Security

**TLS 1.3**: The latest TLS version simplifies the handshake to 1-RTT (or 0-RTT for resumed connections). It removes support for legacy algorithms (RSA key exchange, CBC mode ciphers, SHA-1, MD5), only supports forward-secret key exchanges (ECDHE, DHE), and uses AEAD ciphers (AES-GCM, ChaCha20-Poly1305). The handshake encrypts more of the negotiation process, and the server's certificate is now encrypted.

**Firewall Types**: Packet filters examine individual packets against rules based on source/destination IP, port, and protocol. Stateful firewalls track connection state and allow return traffic for established connections. Application-layer firewalls (WAF) inspect application-layer data and can block specific attacks like SQL injection and XSS. Next-generation firewalls (NGFW) combine traditional firewalling with intrusion prevention, application awareness, and threat intelligence.

**VPN Technologies**: IPSec provides network-layer encryption with two modes: transport (encrypts payload only) and tunnel (encrypts entire packet). OpenVPN uses SSL/TLS for key exchange and supports both UDP and TCP. WireGuard is a modern VPN protocol with a smaller codebase, using Curve25519 for key exchange, ChaCha20 for encryption, and Poly1305 for authentication.

**Common Attack Vectors**: SYN floods exhaust server connection tables by sending SYN packets without completing the handshake. Mitigated with SYN cookies, SYN proxies, and rate limiting. DNS amplification uses open resolvers to amplify attack traffic. BGP hijacking redirects traffic by announcing false routing information. Man-in-the-middle attacks intercept communication between two parties. ARP spoofing associates the attacker's MAC address with a legitimate IP address on the local network.`;

const CRYPTOGRAPHY_AND_SECURITY = `### Symmetric Encryption

**AES (Advanced Encryption Standard)**: Block cipher with 128-bit blocks and key sizes of 128, 192, or 256 bits. AES-256 involves 14 rounds of substitution (SubBytes), row shifting (ShiftRows), column mixing (MixColumns), and key addition (AddRoundKey). The S-box provides non-linearity through multiplicative inversion in GF(2^8). AES is used in disk encryption (BitLocker, FileVault), network protocols (TLS, IPSec), and file encryption. Hardware acceleration (AES-NI) is available on modern processors, achieving throughputs of several GB/s.

**Block Cipher Modes**: ECB (Electronic Codebook) encrypts each block independently — insecure for most uses as identical plaintext blocks produce identical ciphertext blocks. CBC (Cipher Block Chaining) XORs each block with the previous ciphertext block — requires an IV, susceptible to padding oracle attacks. CTR (Counter) converts a block cipher into a stream cipher using a counter — parallelizable and doesn't require padding. GCM (Galois/Counter Mode) combines CTR mode with Galois field multiplication for authenticated encryption — provides both confidentiality and integrity, widely used in TLS.

**ChaCha20-Poly1305**: A stream cipher (ChaCha20) combined with a MAC (Poly1305) for authenticated encryption. Designed by Daniel Bernstein as an alternative to AES-GCM. Uses 256-bit keys, 96-bit nonces, and operates on 512-bit blocks through 20 rounds of quarter-round operations. Particularly efficient in software on platforms without AES hardware acceleration (mobile devices). Used by Google, Cloudflare, and in WireGuard.

### Asymmetric Encryption

**RSA**: Based on the difficulty of factoring large numbers. Key generation involves selecting two large primes p and q, computing n = p × q, computing Euler's totient φ(n) = (p-1)(q-1), choosing public exponent e (commonly 65537), and computing private exponent d = e^(-1) mod φ(n). Encryption: c = m^e mod n. Decryption: m = c^d mod n. RSA-2048 is the minimum recommended key size. RSA is slower than ECC and requires larger keys for equivalent security.

**Elliptic Curve Cryptography (ECC)**: Based on the difficulty of the Elliptic Curve Discrete Logarithm Problem (ECDLP). An elliptic curve over a finite field is defined by y^2 = x^3 + ax + b. Key operations are point addition and scalar multiplication. A 256-bit ECC key provides security equivalent to a 3072-bit RSA key. Common curves include P-256 (NIST), Curve25519 (Bernstein), and secp256k1 (Bitcoin). ECDH provides key exchange, ECDSA provides digital signatures.

**Diffie-Hellman Key Exchange**: Allows two parties to establish a shared secret over an insecure channel. Classic DH uses modular exponentiation: each party generates a private key a or b, computes a public key g^a mod p or g^b mod p, and the shared secret is g^(ab) mod p. ECDH uses elliptic curve scalar multiplication instead, providing better security with smaller keys. X25519 is the most widely used ECDH variant.

### Hash Functions

**SHA-256**: Part of the SHA-2 family, produces a 256-bit digest. Uses Merkle-Damgård construction with Davies-Meyer compression function. Processes input in 512-bit blocks through 64 rounds of operations. Used in Bitcoin mining, digital signatures, certificate fingerprints, and data integrity verification. SHA-512 uses 1024-bit blocks and 80 rounds, producing 512-bit digests.

**BLAKE3**: A modern cryptographic hash function based on the Bao tree structure. Uses a Merkle tree for parallel hashing, achieving speeds of several GB/s on modern hardware. Supports variable-length output, keyed hashing, and key derivation. Faster than SHA-256, SHA-3, and BLAKE2 while providing equivalent security.

**Password Hashing**: bcrypt uses the Blowfish cipher with a configurable cost factor. scrypt adds memory-hardness to resist ASIC/GPU attacks. Argon2 (winner of the Password Hashing Competition) comes in three variants: Argon2d (data-dependent addressing, resistant to GPU attacks), Argon2i (data-independent addressing, resistant to side-channel attacks), and Argon2id (hybrid). All modern password hashing functions use salt to prevent rainbow table attacks and are deliberately slow to resist brute force.

### PKI and Certificates

**X.509 Certificates**: The standard format for public key certificates. Contains: version, serial number, signature algorithm, issuer DN, validity period, subject DN, subject public key, extensions (Key Usage, Subject Alternative Names, Basic Constraints), and the CA's signature. Certificate chains link end-entity certificates to trusted root CAs through intermediate CAs.

**Certificate Transparency**: An open framework for monitoring and auditing SSL certificates. CT logs are append-only, cryptographically assured records of issued certificates. Signed Certificate Timestamps (SCTs) prove a certificate has been logged. Browsers require SCTs for Extended Validation certificates. CT helps detect misissued or malicious certificates.

**ACME Protocol**: Automated Certificate Management Environment, used by Let's Encrypt. Automates domain validation, certificate issuance, and renewal. Challenge types include HTTP-01 (prove control of a web server), DNS-01 (prove control of DNS), and TLS-ALPN-01 (prove control of a TLS server). Certificates are issued for 90 days to encourage automation.`;

const SOFTWARE_ARCHITECTURE = `### Design Patterns

**Creational Patterns**: Singleton ensures only one instance exists — use a private constructor and static method, be cautious in concurrent environments. Factory Method defines an interface for creating objects but lets subclasses decide which class to instantiate. Abstract Factory provides an interface for creating families of related objects. Builder separates construction of complex objects from their representation. Prototype creates new objects by cloning existing ones — useful when construction is expensive.

**Structural Patterns**: Adapter converts one interface to another expected by clients. Bridge decouples abstraction from implementation. Composite treats individual objects and compositions uniformly (tree structures). Decorator adds behavior dynamically without subclassing. Facade provides a simplified interface to a complex subsystem. Flyweight shares fine-grained objects efficiently (e.g., character rendering). Proxy controls access to another object (caching proxy, protection proxy, remote proxy).

**Behavioral Patterns**: Observer defines a one-to-many dependency so dependents are notified of state changes. Strategy defines a family of interchangeable algorithms. Command encapsulates requests as objects, enabling queuing, logging, and undo. Chain of Responsibility passes requests along a chain of handlers. Iterator provides sequential access to collection elements. Mediator centralizes complex communications. Memento captures and restores object state. State allows an object to alter behavior when its state changes. Template Method defines algorithm skeleton in a superclass, letting subclasses override steps. Visitor separates algorithms from the objects they operate on.

### Microservices Architecture

**Service Decomposition**: Domain-Driven Design (DDD) helps identify service boundaries. Bounded contexts define clear boundaries where a particular model applies. Aggregates group related entities that should be treated as a unit. Context mapping documents relationships between bounded contexts (shared kernel, customer-supplier, anti-corruption layer).

**Inter-Service Communication**: Synchronous communication via REST or gRPC for request-response patterns. Asynchronous communication via message brokers (RabbitMQ, Apache Kafka, NATS) for event-driven patterns. gRPC uses Protocol Buffers for serialization, supports bidirectional streaming, and generates client/server code. REST uses HTTP methods (GET, POST, PUT, DELETE, PATCH) with JSON or XML payloads.

**Service Mesh**: A dedicated infrastructure layer for service-to-service communication. Sidecar proxies (e.g., Envoy) handle traffic management, security (mTLS), and observability. Istio provides traffic management (routing, retries, circuit breaking), security (authentication, authorization), and observability (distributed tracing, metrics). Linkerd is a lighter alternative focused on simplicity and performance.

**Saga Pattern**: Manages distributed transactions across multiple services. Choreography: each service listens for events and triggers the next step. Orchestration: a central coordinator manages the saga flow. Compensating transactions undo previous steps when a step fails. Example: an order saga might involve order creation, payment, inventory reservation, and shipping, with compensating actions for each.

**CQRS (Command Query Responsibility Segregation)**: Separates read and write models. Commands modify state and don't return data. Queries return data and don't modify state. Often combined with Event Sourcing, where state changes are stored as a sequence of events rather than current state. Benefits include independent scaling of reads and writes, optimized read models, and complete audit trail.

### Distributed Systems

**CAP Theorem**: A distributed system can provide at most two of three guarantees: Consistency (all nodes see the same data), Availability (every request receives a response), and Partition Tolerance (the system continues despite network partitions). Since network partitions are inevitable in distributed systems, the real choice is between CP (consistent but may be unavailable during partitions) and AP (available but may return stale data during partitions).

**Consensus Algorithms**: Raft divides time into terms, elects a leader per term, and replicates log entries from leader to followers. A log entry is committed when a majority of nodes acknowledge it. Paxos is more general but harder to understand — it separates the roles of proposers, acceptors, and learners. PBFT (Practical Byzantine Fault Tolerance) handles Byzantine failures (malicious nodes) but requires 3f+1 nodes to tolerate f failures.

**Consistent Hashing**: Distributes data across nodes in a way that minimizes redistribution when nodes join or leave. Each node is assigned a position on a virtual ring. Keys are mapped to the ring and assigned to the next node clockwise. Virtual nodes (multiple positions per physical node) improve balance. Used by Cassandra, DynamoDB, and memcached.

**Vector Clocks**: Track causality in distributed systems. Each process maintains a vector of logical timestamps, one per process. On local events, increment own component. On send, attach current vector. On receive, merge vectors (component-wise maximum) and increment own component. Two events are concurrent if neither vector dominates the other. Used by Dynamo, Riak, and other eventually consistent systems.

**Bloom Filters**: Probabilistic data structure for set membership testing. Uses multiple hash functions mapping elements to bit positions in a bit array. False positives are possible (reporting membership when absent) but false negatives are not (never misses a member). Space-efficient: 10 bits per element gives ~1% false positive rate. Counting Bloom filters support deletion. Used in databases (avoiding unnecessary disk reads), web caching, and network routing.

### System Design Patterns

**Rate Limiting**: Token bucket allows bursts up to bucket capacity; leaky bucket smooths traffic at a constant rate; fixed window counts requests per time window; sliding window log tracks timestamps of recent requests; sliding window counter approximates sliding log with less memory. Implement at API gateway or application level. Return HTTP 429 with Retry-After header.

**Circuit Breaker**: Prevents cascading failures in distributed systems. Three states: Closed (requests pass through, failures counted), Open (requests fail fast, no calls to failing service), Half-Open (limited requests test if service recovered). Parameters include failure threshold, timeout duration, and success threshold for recovery. Libraries: Hystrix (Netflix), Resilience4j (Java), Polly (.NET).

**Load Balancing**: Round Robin distributes requests sequentially. Weighted Round Robin accounts for different server capacities. Least Connections routes to the server with fewest active connections. Consistent Hashing ensures the same client reaches the same server (session affinity). Layer 4 (transport) balancing is faster but less flexible. Layer 7 (application) balancing can route based on URL, headers, or cookies. Health checks remove unhealthy servers from the pool.

**Caching Strategies**: Cache-Aside (lazy loading): application manages cache, reads from cache first, falls back to database. Write-Through: writes go to cache and database simultaneously. Write-Behind (Write-Back): writes go to cache, asynchronously written to database. Read-Through: cache automatically loads from database on miss. Cache invalidation strategies include TTL (time-to-live), event-driven invalidation, and versioning.`;

const OPERATING_SYSTEMS = `### Process Management

**Process States**: A process transitions through states: New (being created), Ready (waiting for CPU), Running (executing on CPU), Waiting/Blocked (waiting for I/O or event), Terminated (finished execution). The OS scheduler moves processes between Ready and Running states. Context switches save and restore CPU registers, program counter, stack pointer, and memory management information.

**Scheduling Algorithms**: First-Come First-Served (FCFS) is simple but suffers from the convoy effect. Shortest Job First (SJF) minimizes average waiting time but requires knowing job lengths. Round Robin gives each process a time quantum and cycles through them — good for time-sharing. Priority Scheduling assigns priorities but can cause starvation (solved with aging). Multilevel Feedback Queue uses multiple queues with different priorities and time quanta — processes move between queues based on behavior. Completely Fair Scheduler (CFS) in Linux uses a red-black tree to track virtual runtime, giving each process a fair share of CPU.

**Inter-Process Communication (IPC)**: Pipes provide unidirectional byte streams between related processes. Named pipes (FIFOs) allow communication between unrelated processes. Message queues enable asynchronous message passing with priority support. Shared memory is the fastest IPC mechanism — processes map the same physical memory into their address spaces. Semaphores coordinate access to shared resources. Signals provide asynchronous notifications to processes. Sockets enable communication between processes on different machines.

**Threads**: Lightweight processes sharing the same address space. User-level threads are managed by a thread library without kernel involvement — fast to create and switch but can't take advantage of multiple CPUs. Kernel-level threads are managed by the OS — can run on different CPUs but switching is slower. Many-to-many model maps many user threads to many kernel threads. POSIX threads (pthreads) is the standard threading API on Unix systems. Modern approaches include goroutines (Go), green threads, and async/await (cooperative multitasking).

### Memory Management

**Virtual Memory**: Each process has its own virtual address space, mapped to physical memory by the MMU (Memory Management Unit). Pages (typically 4KB) are the unit of mapping. Page tables store virtual-to-physical mappings. Multi-level page tables reduce memory overhead (x86-64 uses 4 levels). Translation Lookaside Buffers (TLBs) cache recent translations for performance.

**Page Replacement Algorithms**: When physical memory is full and a new page is needed, a page must be evicted. FIFO evicts the oldest page. LRU (Least Recently Used) evicts the page that hasn't been used longest — optimal in practice but expensive to implement exactly. Clock algorithm approximates LRU using a reference bit and a circular list. LFU (Least Frequently Used) evicts the least accessed page.

**Memory Allocation**: First Fit allocates the first hole that's large enough. Best Fit allocates the smallest hole that's large enough — minimizes wasted space but creates many small fragments. Buddy System allocates blocks in powers of 2 — fast coalescing but internal fragmentation. Slab Allocation pre-allocates caches of commonly-sized objects — used by Linux kernel for kernel objects.

### File Systems

**Ext4**: The default Linux file system. Uses extents (contiguous blocks) instead of indirect block mapping for better performance with large files. Supports files up to 16TB and volumes up to 1EB. Journaling modes: journal (safest, logs data and metadata), ordered (default, logs metadata, writes data before metadata), writeback (fastest, only logs metadata). Features include delayed allocation, multi-block allocation, and online defragmentation.

**Btrfs**: A copy-on-write (COW) file system for Linux. Features include snapshots (instantaneous, space-efficient copies of the file system), built-in RAID support (RAID 0, 1, 5, 6, 10), transparent compression (zlib, lzo, zstd), deduplication, checksums for data and metadata, and online resizing and defragmentation. Subvolumes allow logical partitioning within a single file system.

**ZFS**: Originally developed by Sun Microsystems, now maintained by the OpenZFS project. Combines volume management and file system. Features include copy-on-write, snapshots and clones, built-in RAID-Z (single, double, and triple parity), transparent compression and deduplication, end-to-end checksums, and automatic repair of corrupted data. ZFS uses Adaptive Replacement Cache (ARC) for caching, which combines recency and frequency for better hit rates than LRU.

### Concurrency

**Mutual Exclusion**: Prevents multiple threads from accessing critical sections simultaneously. Hardware approaches: test-and-set, compare-and-swap (CAS), load-linked/store-conditional. Software approaches: Peterson's algorithm (two processes), Bakery algorithm (n processes). OS primitives: mutexes (binary locks), semaphores (counting locks), monitors (high-level synchronization).

**Deadlock**: Occurs when processes hold resources while waiting for others. Four necessary conditions: mutual exclusion, hold and wait, no preemption, circular wait. Prevention: eliminate one condition (e.g., request all resources at once, allow preemption, impose ordering). Avoidance: Banker's algorithm checks if granting a request leads to a safe state. Detection: build a wait-for graph and check for cycles. Recovery: terminate processes or preempt resources.

**Lock-Free Data Structures**: Use atomic operations (CAS) instead of locks. ABA problem occurs when a value changes from A to B and back to A between a read and CAS — solved with tagged pointers or hazard pointers. Michael-Scott queue is a classic lock-free FIFO queue. Treiber stack is a lock-free LIFO stack. Lock-free structures avoid deadlock and priority inversion but are harder to design and verify.`;

const DATA_STRUCTURES_AND_ALGORITHMS = `### Tree Data Structures

**Binary Search Trees (BST)**: Each node has at most two children. Left child's key is less than parent's, right child's key is greater. Search, insert, and delete are O(h) where h is the height. Worst case (skewed tree): O(n). Balanced BSTs guarantee O(log n) height.

**AVL Trees**: Self-balancing BSTs where the height difference between left and right subtrees is at most 1 for every node. Rotations (single left, single right, double left-right, double right-left) restore balance after insertions and deletions. Provides O(log n) worst-case for search, insert, and delete. More strictly balanced than red-black trees, so faster lookups but slower insertions.

**Red-Black Trees**: Self-balancing BSTs with colored nodes (red or black). Properties: root is black, leaves (NIL) are black, red nodes have black children, all paths from root to leaves have equal black nodes. Height is at most 2×log₂(n+1). Used by Linux CFS scheduler, Java TreeMap, and C++ std::map. Insertions require at most 2 rotations, deletions at most 3.

**B-Trees**: Balanced search trees optimized for disk access. Each node can have many keys and children (order m: up to m children, m-1 keys). All leaves at the same depth. Minimizes disk I/O by storing many keys per node (matching disk block size). B+ trees store all data in leaves with leaf-level linked lists for range queries — used by most databases (MySQL InnoDB, PostgreSQL, SQLite) and file systems.

**Tries (Prefix Trees)**: Tree structure for storing strings where each edge represents a character. Lookup time is O(L) where L is the string length, independent of the number of strings stored. Compressed tries (Patricia/Radix trees) merge single-child nodes. Used for autocomplete, spell checking, IP routing tables, and dictionary implementations. Ternary search tries use three children per node (less, equal, greater) for better space efficiency.

**Segment Trees**: Binary trees for efficient range queries and point updates on arrays. Each node stores an aggregate value (sum, min, max) for a range. Build in O(n), query and update in O(log n). Lazy propagation defers updates to children, enabling O(log n) range updates. Used in competitive programming and computational geometry. Persistent segment trees preserve previous versions for historical queries.

### Graph Algorithms

**Shortest Path**: Dijkstra's algorithm finds shortest paths from a source to all vertices in graphs with non-negative weights — O((V + E) log V) with a binary heap. Bellman-Ford handles negative weights in O(V × E) and detects negative cycles. Floyd-Warshall finds shortest paths between all pairs in O(V³). A* uses heuristics to guide search — optimal and complete when the heuristic is admissible (never overestimates).

**Minimum Spanning Tree**: Kruskal's algorithm sorts edges by weight and adds them if they don't create a cycle — uses Union-Find for cycle detection, O(E log E). Prim's algorithm grows the MST from a starting vertex, always adding the cheapest edge to a non-tree vertex — O((V + E) log V) with a binary heap. Both produce the same MST weight on unique-weight graphs.

**Network Flow**: Ford-Fulkerson finds maximum flow by repeatedly finding augmenting paths. Edmonds-Karp uses BFS for augmenting paths — O(V × E²). Dinic's algorithm uses level graphs and blocking flows — O(V² × E). Push-relabel algorithm maintains a preflow and uses push and relabel operations — O(V² × sqrt(E)). Applications include bipartite matching, minimum cut, and project selection.

**Topological Sort**: Linear ordering of vertices in a DAG such that for every directed edge (u, v), u comes before v. Kahn's algorithm uses in-degree counting and a queue — O(V + E). DFS-based approach processes vertices in reverse finish time. Applications include build systems (Make, Gradle), task scheduling, course prerequisite ordering, and dependency resolution.

### Sorting Algorithms

**Comparison-Based Sorts**: Merge sort is stable and O(n log n) worst case — uses divide and conquer, requires O(n) extra space. Quicksort is O(n log n) average case, O(n²) worst case — in-place but not stable, median-of-three pivot selection mitigates worst case. Heapsort is O(n log n) worst case and in-place but not stable. Timsort (Python, Java) combines merge sort and insertion sort — O(n log n) worst case, adaptive to partially sorted data.

**Non-Comparison Sorts**: Counting sort counts occurrences of each value — O(n + k) where k is the range, stable, requires O(k) extra space. Radix sort processes digits from least to most significant using a stable sort (counting sort) — O(d × (n + k)) where d is the number of digits. Bucket sort distributes elements into buckets, sorts each bucket — O(n) average case for uniformly distributed data.

### Dynamic Programming

**Classical Problems**: Longest Common Subsequence (LCS) in O(mn) time and space, optimizable to O(min(m,n)) space. Knapsack: 0/1 knapsack in O(nW) pseudo-polynomial time, unbounded knapsack allows repeated items. Edit Distance (Levenshtein) measures minimum operations (insert, delete, replace) between two strings — used in spell checking and DNA sequence alignment. Matrix Chain Multiplication finds optimal parenthesization in O(n³).

**Optimization Techniques**: Memoization (top-down) caches results of subproblems as they're computed — easier to implement but has recursion overhead. Tabulation (bottom-up) fills a table iteratively from base cases — no recursion overhead, can be optimized for space. Space optimization reduces O(n × m) tables to O(m) when only the previous row is needed. Bitmask DP represents subsets as bit masks for problems involving sets.`;

export function generateCachingPrompt(): string {
  const sections = [
    FLOSSK_CORE,
    generateSection("About FLOSSK", ABOUT_FLOSSK),
    generateSection("Key Activities", KEY_ACTIVITIES),
    generateSection("Albanian Language Model Benchmark", ALBANIAN_BENCHMARK),
    generateSection("Workshop Series: Building with LLMs", WORKSHOP_SERIES),
    generateSection("Kosovo Tech Ecosystem", KOSOVO_TECH),
    generateSection("Open Source History", OPEN_SOURCE_HISTORY),
    generateSection("Technical Concepts", TECHNICAL_CONCEPTS),
    generateSection("Programming Languages Reference", PROGRAMMING_LANGUAGES),
    generateSection("Database Systems", DATABASE_SYSTEMS),
    generateSection("DevOps and Cloud Computing", DEVOPS_AND_CLOUD),
    generateSection("Web Development", WEB_DEVELOPMENT),
    generateSection("AI and Machine Learning", AI_AND_ML),
    generateSection("Networking and Protocols", NETWORKING_AND_PROTOCOLS),
    generateSection("Cryptography and Security", CRYPTOGRAPHY_AND_SECURITY),
    generateSection("Software Architecture", SOFTWARE_ARCHITECTURE),
    generateSection("Operating Systems", OPERATING_SYSTEMS),
    generateSection("Data Structures and Algorithms", DATA_STRUCTURES_AND_ALGORITHMS),
  ];

  return sections.join("\n");
}
