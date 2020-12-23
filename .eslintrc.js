module.exports = {
    root: true,
    env: {
        node: true
    },
    extends: [
        'plugin:vue/vue3-essential',
        '@vue/standard',
        '@vue/typescript/recommended'
    ],
    parserOptions: {
        ecmaVersion: 2020
    },
    rules: {
        "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
        "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
        "no-multiple-empty-lines": ["off"],
        "space-before-function-paren": ["error", "never"],
        "indent": ["error", 4, {
            "MemberExpression": "off"
        }],
        "prefer-const": ["off"],
        "keyword-spacing": ["error", {
            "overrides": {
                "if": { "after": false },
                "for": { "after": false },
                "while": { "after": false }
            }
        }],
        "semi": ["off"],
        "brace-style": ["error", "stroustrup"],
        "no-trailing-spaces": ["off"],
        "eol-last": ["off"],
    }
}
