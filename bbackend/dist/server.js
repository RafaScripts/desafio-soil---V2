"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routesUsers_1 = __importDefault(require("./routes/routesUsers"));
const routesGames_1 = __importDefault(require("./routes/routesGames"));
const firstGenerateUsers_1 = require("./utils/firstGenerateUsers");
const path = __importStar(require("path"));
const fs = __importStar(require("fs"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({ origin: '*' }));
app.use(express_1.default.json());
app.use('/api/v1', routesUsers_1.default);
app.use('/api/v1', routesGames_1.default);
async function configureRoutes() {
    const routesFolder = path.join(__dirname, "routes");
    let files = fs.readdirSync(routesFolder);
    if (process.env.NODE_ENV === "production") {
        files = files.filter((file) => path.extname(file) === ".js");
    }
    files.forEach((file) => {
        const router = require(path.join(routesFolder, file)).default;
        const baseRoute = file.replace(/Router\.(ts|js)$/, "");
        this.app.use(`/api/${baseRoute}`, router);
    });
}
app.listen(3000, async () => {
    await (0, firstGenerateUsers_1.firstGenerateUsers)();
    console.log('Server is running on port 3000');
});
