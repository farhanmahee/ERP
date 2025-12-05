'''
import * as fs from 'fs';
import * as path from 'path';

const packageJsonContent = fs.readFileSync(path.resolve(__dirname, '../../package.json'), 'utf8');
const packageJson = JSON.parse(packageJsonContent);

describe('package.json', () => {
  it('should have the correct name', () => {
    expect(packageJson.name).toBe('@erp/api');
  });

  it('should have a valid version', () => {
    // simple semver regex
    expect(packageJson.version).toMatch(/^\d+\.\d+\.\d+$/);
  });

  it('should be private', () => {
    expect(packageJson.private).toBe(true);
  });

  describe('scripts', () => {
    it('should have a build script', () => {
      expect(packageJson.scripts.build).toBe('nest build');
    });

    it('should have a start script', () => {
      expect(packageJson.scripts.start).toBe('nest start');
    });

    it('should have a start:dev script', () => {
      expect(packageJson.scripts['start:dev']).toBe('nest start --watch');
    });

    it('should have a test script', () => {
      expect(packageJson.scripts.test).toBe('jest');
    });
  });

  describe('dependencies', () => {
    const expectedDependencies = [
      '@google/genai',
      '@nestjs/common',
      '@nestjs/core',
      '@nestjs/jwt',
      '@nestjs/passport',
      '@nestjs/platform-express',
      '@nestjs/swagger',
      '@prisma/client',
      'bcrypt',
      'class-transformer',
      'class-validator',
      'firebase-admin',
      'passport',
      'passport-jwt',
      'passport-local',
      'reflect-metadata',
      'rxjs'
    ];

    it('should have all the required dependencies', () => {
      expect(Object.keys(packageJson.dependencies).sort()).toEqual(expectedDependencies.sort());
    });
  });

  describe('devDependencies', () => {
    it('should have the nestjs dev dependencies', () => {
      expect(packageJson.devDependencies).toHaveProperty('@nestjs/cli');
      expect(packageJson.devDependencies).toHaveProperty('@nestjs/schematics');
      expect(packageJson.devDependencies).toHaveProperty('@nestjs/testing');
    });
  });
});
'''