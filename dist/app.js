"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const connectDB_1 = __importDefault(require("./utils/connectDB"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const vocabularyRoutes_1 = __importDefault(require("./routes/vocabularyRoutes"));
const swagger_1 = __importDefault(require("./utils/swagger"));
const app = (0, express_1.default)();
dotenv_1.default.config(); // Set up Global configuration access
connectDB_1.default.connect(); // connect to database
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    (0, swagger_1.default)(app);
    console.log(`Running on http://localhost:${PORT}`);
});
app.use(express_1.default.static('public'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, morgan_1.default)('dev'));
app.use((0, cors_1.default)());
app.get('/', (req, res) => res.json({ message: '/' }));
app.use('/api/v1/users', userRoutes_1.default);
app.use('/api/v1/vocabularies', vocabularyRoutes_1.default);
//# sourceMappingURL=app.js.map