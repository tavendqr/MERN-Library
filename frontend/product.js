import { create } from "zustand";

export const useBookStore = create((set) => ({
    books: [],
    user: null,
    setBooks: (books) => set({books}),

    login: async ({ username, password }) => {
        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify({ username, password }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message);

            set({ user: data.data});
            return { success: true, role: data.data.role };
        } catch(error) {
             return { success: false, message: error.message };
        }
    },

    signup: async ({ username, password, role}) => {
        try {
            const res = await fetch("api/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify({username, password, role}),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message);
            return { success: true };
        } catch (error) {
            return { success: false, message: error.message };
        }
    },

    logout: () => set({ user: null }),

    createBook: async (newBook) => {
        if (!newBook.name || !newBook.price || !newBook.author) {
            console.log("Fill all fields");
        }

        if (isNaN(newBook.price)) {
                return { success: false, message: "Price must be a valid number" };
                
            }


        const res = await fetch("/api/display", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newBook),
        });
        const data = await res.json();

        if (!res.ok) {
            return { success: false, message: data.message || "Book creation failed" };
        }
        
        set((state) => ({books: [...state.books, data.data] }));
        return { success: true, message: "Book created successfully" };
    },
    fetchBooks: async () => {
        const res = await fetch("/api/display");
        const data = await res.json();
        set({books: data.data});
    },

}));