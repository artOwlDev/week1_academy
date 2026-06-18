import express from "express";
const router = express.Router();

router.get("/expenses", (req, res) => {
    const expense = [
        { id: 1, title: "Getting Started", content: " .", author: "Alice" },
        { id: 2, title: "Getting Started2", content: " .", author: "Alice2" },
        { id: 3, title: "Getting Started3", content: " .", author: "Alice3" }
    ];
    res.status(200).json(expense);
});

router.get("/expenses/:id", (req, res) => {
    const { id } = req.params;
    const post = { id: Number(id), title: "Getting Started", author: "Alice" };

    if (!post) {
        return res.status(404).json({ error: "Post not found" });
    }

    res.status(200).json(post);
})

router.post("/expenses", (req, res) => {
    console.log(req.body);
    res.json("Worked!")
})

router.put("/expenses/:id", (req, res) => {
    const { id } = req.params;
    // const { title, content, author } = req.body;

    const updated = { id: Number(id), title: "Updated Name", content: "Updated Content", author: "Updated Author" };
    res.status(200).json(updated);
});

router.delete("/expenses/:id", (req, res) => {
    const { id } = req.params;
    res.status(204).send();
});


export default router