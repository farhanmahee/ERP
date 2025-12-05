"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SyncService = void 0;
const common_1 = require("@nestjs/common");
const firebase_config_1 = require("../../config/firebase.config");
const logging_service_1 = require("../logging/logging.service");
let SyncService = class SyncService {
    constructor(loggingService) {
        this.loggingService = loggingService;
        this.primaryFirestore = (0, firebase_config_1.getPrimaryFirestore)();
        this.secondaryFirestore = (0, firebase_config_1.getSecondaryFirestore)();
    }
    async syncCollection(collectionName) {
        await this.loggingService.log('info', `Sync started for collection: ${collectionName}.`, {
            collectionName,
        });
        try {
            const sourceCollection = this.primaryFirestore.collection(collectionName);
            const destinationCollection = this.secondaryFirestore.collection(collectionName);
            const snapshot = await sourceCollection.get();
            if (snapshot.empty) {
                await this.loggingService.log('warn', `Source collection '${collectionName}' is empty. No documents to sync.`, { collectionName });
                return { message: 'No documents to sync.', documentsCopied: 0 };
            }
            const batch = this.secondaryFirestore.batch();
            snapshot.docs.forEach(doc => {
                const docRef = destinationCollection.doc(doc.id);
                batch.set(docRef, doc.data());
            });
            await batch.commit();
            const successMessage = `Successfully synced ${snapshot.size} documents from '${collectionName}' to the secondary database.`;
            await this.loggingService.log('info', successMessage, {
                collectionName,
                documentsCopied: snapshot.size,
            });
            return {
                message: successMessage,
                documentsCopied: snapshot.size,
            };
        }
        catch (error) {
            await this.loggingService.log('error', `Error syncing collection '${collectionName}'.`, { collectionName, error: error.message });
            throw error;
        }
    }
};
exports.SyncService = SyncService;
exports.SyncService = SyncService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [logging_service_1.LoggingService])
], SyncService);
//# sourceMappingURL=sync.service.js.map