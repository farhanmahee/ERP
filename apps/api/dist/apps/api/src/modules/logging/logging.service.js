"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggingService = void 0;
const common_1 = require("@nestjs/common");
const firebase_config_1 = require("../../config/firebase.config");
let LoggingService = class LoggingService {
    constructor() {
        this.firestore = (0, firebase_config_1.getSecondaryFirestore)();
    }
    async log(level, message, data = {}) {
        const logEntry = Object.assign({ level,
            message, timestamp: new Date().toISOString() }, data);
        try {
            await this.firestore.collection('logs').add(logEntry);
        }
        catch (error) {
            console.error('Failed to write log to Firestore:', error);
        }
    }
};
exports.LoggingService = LoggingService;
exports.LoggingService = LoggingService = __decorate([
    (0, common_1.Injectable)()
], LoggingService);
//# sourceMappingURL=logging.service.js.map