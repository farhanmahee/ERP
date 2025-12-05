"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
const gitignoreContent = fs.readFileSync(path.resolve(__dirname, '../.gitignore'), 'utf8');
const gitignorePatterns = gitignoreContent.split('\n').filter(pattern => pattern.trim() !== '' && !pattern.startsWith('#'));
describe('.gitignore', () => {
    it('should ignore node_modules', () => {
        expect(gitignorePatterns).toContain('/node_modules');
    });
    it('should ignore .pnp', () => {
        expect(gitignorePatterns).toContain('/.pnp');
    });
    it('should ignore .pnp.js', () => {
        expect(gitignorePatterns).toContain('.pnp.js');
    });
    it('should ignore coverage', () => {
        expect(gitignorePatterns).toContain('/coverage');
    });
    it('should ignore build', () => {
        expect(gitignorePatterns).toContain('/build');
    });
    it('should ignore dist', () => {
        expect(gitignorePatterns).toContain('/dist');
    });
    it('should ignore .next', () => {
        expect(gitignorePatterns).toContain('.next/');
    });
    it('should ignore out', () => {
        expect(gitignorePatterns).toContain('/out/');
    });
    it('should ignore .DS_Store', () => {
        expect(gitignorePatterns).toContain('.DS_Store');
    });
    it('should ignore *.pem', () => {
        expect(gitignorePatterns).toContain('*.pem');
    });
    it('should ignore npm-debug.log*', () => {
        expect(gitignorePatterns).toContain('npm-debug.log*');
    });
    it('should ignore yarn-debug.log*', () => {
        expect(gitignorePatterns).toContain('yarn-debug.log*');
    });
    it('should ignore yarn-error.log*', () => {
        expect(gitignorePatterns).toContain('yarn-error.log*');
    });
    it('should ignore .env', () => {
        expect(gitignorePatterns).toContain('.env');
    });
    it('should ignore .env.local', () => {
        expect(gitignorePatterns).toContain('.env.local');
    });
    it('should ignore .env.development.local', () => {
        expect(gitignorePatterns).toContain('.env.development.local');
    });
    it('should ignore .env.test.local', () => {
        expect(gitignorePatterns).toContain('.env.test.local');
    });
    it('should ignore .env.production.local', () => {
        expect(gitignorePatterns).toContain('.env.production.local');
    });
});
//# sourceMappingURL=gitignore.test.js.map