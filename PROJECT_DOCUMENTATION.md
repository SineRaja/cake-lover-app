
### 📜 **PROJECT_DOCUMENTATION.md**  
#### **Cake Lovers App - Project Structure and File Usage**  


## 🔗 **Frontend Documentation**

### **1.1 Project Structure**
Defines the directory layout of the frontend project, listing all files and their purposes.

### **1.2 Components Overview**
Breaks down UI components, including:
- Cards (`CakeCard.tsx`)
- Forms (`CakeForm.tsx`)
- Layout (`Layout.tsx`)

### **1.3 Configuration**
Explains the **API setup (`api.ts`)** and global settings.

### **1.4 Library & Validation**
Covers `validationSchema.ts` and its role in enforcing form validation.

### **1.5 Pages & Routing**
Outlines Next.js page structure (`index.tsx`, `add.tsx`, `edit/[id].tsx`, etc.).

### **1.6 Services & API Calls**
Explains API interactions via `cakeService.ts`.

### **1.7 State Management**
Describes `cakeStore.ts` (Zustand for global state).

### **1.8 Styling**
Documents `globals.css` for global styles.

### **1.9 Type Definitions**
Defines TypeScript types (`cake.ts`).

### **1.10 Other Files**
Lists `.gitignore`, `eslint.config.mjs`, and Next.js-specific files.

### **1.11 Next Steps**
- Implement **pagination**
- Optimize **state management**
- Improve **performance**

---

## 🔗 **Backend Documentation**

### **2.1 Backend Project Structure**
Breaks down the Express.js backend structure.

### **2.2 Configuration & Database**
Documents `db.ts` (MongoDB connection).

### **2.3 Controllers & Business Logic**
Explains `cake.controller.ts` for handling CRUD logic.

### **2.4 API Documentation**
Describes Swagger API documentation (`swagger.ts`).

### **2.5 Middleware & Validation**
Details validation rules in `validation.middleware.ts`.

### **2.6 Models & Schema**
Documents `cake.model.ts` (Mongoose schema for cakes).

### **2.7 Routes & API Endpoints**
Outlines available RESTful endpoints (`cake.routes.ts`).

### **2.8 Application Setup & Server**
Explains:
- `app.ts` (Express setup)
- `server.ts` (Server initialization)

### **2.9 Other Backend Files**
Describes `.env`, `nodemon.json`, `tsconfig.json`, and `package.json`.

### **2.10 Installation & Setup**
Step-by-step guide to set up and run the backend.

### **2.11 Next Steps**
- Add **JWT authentication**
- Implement **pagination**
- Optimize **MongoDB queries**

---

This **index** ensures structured navigation for both **frontend and backend documentation**. 📖🚀

This document provides an overview of the project structure, defining the purpose and usage of each file and directory.

---

## 📂 **Project Structure**
```
📦 src
 ┣ 📂 components
 ┃ ┣ 📂 cards
 ┃ ┃ ┗ 📜 CakeCard.tsx
 ┃ ┣ 📂 forms
 ┃ ┃ ┗ 📜 CakeForm.tsx
 ┃ ┣ 📂 layout
 ┃ ┃ ┗ 📜 Layout.tsx
 ┃
 ┣ 📂 config
 ┃ ┗ 📜 api.ts
 ┃
 ┣ 📂 lib
 ┃ ┗ 📜 validationSchema.ts
 ┃
 ┣ 📂 pages
 ┃ ┣ 📂 cakes
 ┃ ┃ ┣ 📂 edit
 ┃ ┃ ┃ ┗ 📜 [id].tsx
 ┃ ┃ ┣ 📜 [id].tsx
 ┃ ┃ ┣ 📜 add.tsx
 ┃ ┃ ┣ 📜 index.tsx
 ┃ ┃ 
 ┃ ┣ 📜 _app.tsx
 ┃ ┣ 📜 index.tsx
 ┃
 ┣ 📂 services
 ┃ ┗ 📜 cakeService.ts
 ┃
 ┣ 📂 store
 ┃ ┗ 📜 cakeStore.ts
 ┃
 ┣ 📂 styles
 ┃ ┗ 📜 globals.css
 ┃
 ┣ 📂 types
 ┃ ┗ 📜 cake.ts
 ┃
 ┣ 📜 .gitignore
 ┣ 📜 eslint.config.mjs
 ┣ 📜 next-env.d.ts
```

---

## 📌 **1. Components Directory (`components/`)**  
Contains reusable UI components.

- **`cards/`** - Contains card-based UI components.  
  - **`CakeCard.tsx`**: Displays individual cakes with an image, name, and yum factor. Uses `Link` for navigation.

- **`forms/`** - Contains form components.  
  - **`CakeForm.tsx`**: A reusable form component for adding and editing cakes.

- **`layout/`** - Contains layout-related components.  
  - **`Layout.tsx`**: Defines the overall structure of pages, including navigation and common styles.

---

## 📌 **2. Configuration Directory (`config/`)**  
Contains API configuration files.

- **`api.ts`**: Centralized API configurations for handling backend requests.

---

## 📌 **3. Library (`lib/`)**  
Contains validation logic.

- **`validationSchema.ts`**: Defines form validation rules using `Zod` for cake submission.

---

## 📌 **4. Pages Directory (`pages/`)**  
Contains Next.js page components.

- **`_app.tsx`**: Global configuration for the Next.js application.  
- **`index.tsx`**: The home page, redirects to the `/cakes` route.

### **`pages/cakes/`**  
- **`index.tsx`**: Displays the list of all cakes. Uses `CakeCard` for each item.  
- **`add.tsx`**: A form page for adding a new cake. Uses `CakeForm`.  
- **`[id].tsx`**: Displays details of a single cake.  
- **`edit/[id].tsx`**: Allows editing an existing cake.

---

## 📌 **5. Services Directory (`services/`)**  
Contains API service functions for fetching, adding, updating, and deleting cakes.

- **`cakeService.ts`**:  
  - `getAllCakes()`: Fetches all cakes from the backend.  
  - `getCakeById(id)`: Fetches details of a specific cake.  
  - `createCake(cakeData)`: Adds a new cake.  
  - `updateCake(id, cakeData)`: Updates an existing cake.  
  - `deleteCake(id)`: Deletes a cake.

---

## 📌 **6. Store Directory (`store/`)**  
Manages application state using `Zustand`.

- **`cakeStore.ts`**:  
  - Stores the list of cakes.  
  - Handles API calls using service functions.  
  - Keeps track of `loading` and `error` states.

---

## 📌 **7. Styles (`styles/`)**  
Contains global CSS styles.

- **`globals.css`**: Defines base styles for the entire app.

---

## 📌 **8. Types Directory (`types/`)**  
Defines TypeScript interfaces.

- **`cake.ts`**: Defines the `Cake` type with fields:  
  ```ts
  export interface Cake {
    _id: string;
    name: string;
    comment: string;
    imageUrl: string;
    yumFactor: number;
  }
  ```

---

## 📌 **9. Other Files**
- **`.gitignore`**: Specifies ignored files in version control.  
- **`eslint.config.mjs`**: ESLint configuration for code linting.  
- **`next-env.d.ts`**: Ensures TypeScript compatibility with Next.js.

---

## 🚀 **Next Steps**
- **Implement Pagination:** Improve performance by fetching cakes in chunks (`getAllCakes(page, limit)`).  
- **Optimize with Memoization:** Use `React.memo` and `useMemo` for performance tuning.  
- **Lazy Load Images:** Implement `loading="lazy"` in `Image` components.  
- **Skeleton Loading:** Show placeholders while fetching data.  



### 📜 **Backend Documentation for Cake Lovers App**  
This document provides an overview of the backend structure, file usage, and installation steps.

---

## 📂 **Project Structure**
```
📦 cake-api
 ┣ 📂 src
 ┃ ┣ 📂 config
 ┃ ┃ ┗ 📜 db.ts
 ┃ ┣ 📂 controllers
 ┃ ┃ ┗ 📜 cake.controller.ts
 ┃ ┣ 📂 docs
 ┃ ┃ ┗ 📜 swagger.ts
 ┃ ┣ 📂 middleware
 ┃ ┃ ┗ 📜 validation.middleware.ts
 ┃ ┣ 📂 models
 ┃ ┃ ┗ 📜 cake.model.ts
 ┃ ┣ 📂 routes
 ┃ ┃ ┗ 📜 cake.routes.ts
 ┃ ┣ 📜 app.ts
 ┃ ┗ 📜 server.ts
 ┣ 📜 .env
 ┣ 📜 nodemon.json
 ┣ 📜 package-lock.json
 ┣ 📜 package.json
 ┣ 📜 tsconfig.json
```

---

## 📌 **1. Configuration Directory (`config/`)**  
Contains database configuration and environment setup.

- **`db.ts`**:  
  - Connects to MongoDB using Mongoose.
  - Reads database connection string from `.env`.
  - Exports the database connection instance.

---

## 📌 **2. Controllers (`controllers/`)**  
Handles business logic and interacts with models.

- **`cake.controller.ts`**:  
  - `getAllCakes()`: Fetches all cakes from the database.  
  - `getCakeById(req, res)`: Fetches a single cake by ID.  
  - `createCake(req, res)`: Creates a new cake entry.  
  - `updateCake(req, res)`: Updates an existing cake.  
  - `deleteCake(req, res)`: Deletes a cake by ID.  

---

## 📌 **3. Documentation (`docs/`)**  
Contains API documentation.

- **`swagger.ts`**:  
  - Configures Swagger API documentation.  
  - Defines endpoints and request/response schemas.  

---

## 📌 **4. Middleware (`middleware/`)**  
Handles validation and request pre-processing.

- **`validation.middleware.ts`**:  
  - Validates incoming request data.  
  - Ensures required fields like `name`, `comment`, and `yumFactor` are present.  
  - Uses `express-validator` for validation.

---

## 📌 **5. Models (`models/`)**  
Defines database schema using Mongoose.

- **`cake.model.ts`**:  
  - Defines `Cake` schema with fields:  
    ```ts
    const CakeSchema = new Schema({
      name: { type: String, required: true, unique: true },
      comment: { type: String, required: true, minlength: 5, maxlength: 200 },
      imageUrl: { type: String, required: true },
      yumFactor: { type: Number, required: true, min: 1, max: 5 }
    });
    ```
  - Exports the Mongoose model.

---

## 📌 **6. Routes (`routes/`)**  
Defines API endpoints.

- **`cake.routes.ts`**:  
  - **`GET /cakes`** - Fetch all cakes.  
  - **`GET /cakes/:id`** - Fetch a specific cake.  
  - **`POST /cakes`** - Add a new cake.  
  - **`PUT /cakes/:id`** - Update a cake.  
  - **`DELETE /cakes/:id`** - Remove a cake.  
  - Uses middleware for validation.

---

## 📌 **7. Application Entry Points**  
Handles Express app setup and server initialization.

- **`app.ts`**:  
  - Configures Express app.  
  - Sets up middleware like `body-parser` and CORS.  
  - Loads routes.

- **`server.ts`**:  
  - Starts the Express server.  
  - Listens on port from `.env`.

---

## 📌 **8. Other Files**
- **`.env`**: Stores environment variables like database connection string.  
- **`nodemon.json`**: Configures `nodemon` for auto-reloading during development.  
- **`package.json`**: Lists dependencies and scripts.  
- **`tsconfig.json`**: TypeScript configuration file.

---

## ⚙️ **Installation and Setup**
### **1️⃣ Clone the Repository**
```sh
git clone https://github.com/your-repo/cake-api.git
cd cake-api
```

### **2️⃣ Install Dependencies**
```sh
npm install
```

### **3️⃣ Configure Environment Variables**
Create a `.env` file in the root directory and add:
```env
PORT=5000
MONGO_URI=mongodb+srv://your-username:your-password@cluster.mongodb.net/cakes
```

### **4️⃣ Start the Development Server**
```sh
npm run dev
```
- Runs the backend in development mode.
- Watches for file changes with `nodemon`.

### **5️⃣ Build and Run in Production**
```sh
npm run build
npm start
```

### **6️⃣ API Documentation (Swagger)**
- Visit `http://localhost:5000/api-docs` to view Swagger API documentation.

---

## 🚀 **Next Steps**
- **Implement JWT Authentication**: Secure endpoints for user-specific operations.  
- **Add Pagination for Cakes**: Improve performance by limiting results per request.  
- **Optimize Query Performance**: Use MongoDB indexes for faster lookups.  

