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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const prisma_service_1 = require("../../prisma/prisma.service");
const bcrypt = require("bcrypt");
let AuthService = class AuthService {
    constructor(prisma, jwtService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
    }
    async validateUser(email, pass, tenantId) {
        const user = await this.prisma.user.findFirst({
            where: { email, tenantId },
            include: { role: true }
        });
        if (user && (await bcrypt.compare(pass, user.passwordHash))) {
            const { passwordHash } = user, result = __rest(user, ["passwordHash"]);
            return result;
        }
        return null;
    }
    async login(user) {
        var _a, _b;
        const payload = {
            email: user.email,
            sub: user.id,
            tenantId: user.tenantId,
            role: (_a = user.role) === null || _a === void 0 ? void 0 : _a.name
        };
        return {
            access_token: this.jwtService.sign(payload),
            user: {
                id: user.id,
                email: user.email,
                name: user.fullName,
                role: (_b = user.role) === null || _b === void 0 ? void 0 : _b.name
            }
        };
    }
    async register(data, tenantId) {
        const existing = await this.prisma.user.findFirst({
            where: { email: data.email, tenantId }
        });
        if (existing) {
            throw new common_1.ConflictException('User already exists in this tenant');
        }
        const hashedPassword = await bcrypt.hash(data.password, 10);
        const defaultRole = await this.prisma.role.findFirst({ where: { name: 'ACCOUNTANT' } });
        const user = await this.prisma.user.create({
            data: {
                email: data.email,
                passwordHash: hashedPassword,
                fullName: data.fullName,
                phone: data.phone,
                tenantId: tenantId,
                roleId: defaultRole ? defaultRole.id : 1
            },
            include: { role: true }
        });
        return this.login(user);
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof prisma_service_1.PrismaService !== "undefined" && prisma_service_1.PrismaService) === "function" ? _a : Object, jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map