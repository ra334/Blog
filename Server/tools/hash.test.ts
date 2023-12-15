import { describe, it, expect } from "vitest";
import * as bcrypt from "bcrypt";
import { hashPassword, comparePassword } from "./hash";

describe("hashPassword function", () => {
    const password = 'password'
    let hash = ''

    it("should hash the password correctly", () => {
        const hashedPassword = hashPassword(password);

        hash = hashedPassword

        expect(hashedPassword).not.equal(hashPassword, password);
        expect(bcrypt.compare(password, hashedPassword)).toBeTruthy();
    });

    it("should generate different hashes for different passwords", () => {
        const password1 = "password1";
        const password2 = "password2";

        const hashedPassword1 = hashPassword(password1);
        const hashedPassword2 = hashPassword(password2);

        expect(hashedPassword1).not.equal(hashedPassword2);
    });

    it("should compare password", () => {
        const isValid = comparePassword(password, hash)

        expect(isValid).toBeTruthy()
    });
});
