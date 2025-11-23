const express = require('express');
const courseRoutes = require('./src/routes/courseRoutes');
const errorHandler = require('./src/middleware/errorHandler');

const app = express();

app.use(express.json());

app.use('/api/v1/courses', courseRoutes);

app.use((req, res, next) => {
  res.status(404).json({ error: "Route not found" });
});


app.use(errorHandler);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
