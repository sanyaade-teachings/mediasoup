const eslintConfig = {
	env: {
		es6: true,
		node: true,
	},
	plugins: ['prettier'],
	settings: {},
	parserOptions: {
		ecmaVersion: 2022,
		sourceType: 'module',
		ecmaFeatures: {
			impliedStrict: true,
		},
		lib: ['es2022'],
	},
	globals: {
		NodeJS: 'readonly',
	},
	extends: ['eslint:recommended', 'plugin:prettier/recommended'],
	rules: {
		'prettier/prettier': 2,
		'constructor-super': 2,
		curly: [2, 'all'],
		// Unfortunatelly `curly` does not apply to blocks in `switch` cases so
		// this is needed.
		'no-restricted-syntax': [
			2,
			{
				selector: 'SwitchCase > *.consequent[type!="BlockStatement"]',
				message: 'Switch cases without blocks are disallowed',
			},
		],
		'guard-for-in': 2,
		'newline-after-var': 2,
		'newline-before-return': 2,
		'no-alert': 2,
		'no-caller': 2,
		'no-case-declarations': 2,
		'no-catch-shadow': 2,
		'no-class-assign': 2,
		'no-console': 2,
		'no-const-assign': 2,
		'no-debugger': 2,
		'no-dupe-args': 2,
		'no-dupe-keys': 2,
		'no-duplicate-case': 2,
		'no-div-regex': 2,
		'no-empty': [2, { allowEmptyCatch: true }],
		'no-empty-pattern': 2,
		'no-else-return': 0,
		'no-eval': 2,
		'no-extend-native': 2,
		'no-ex-assign': 2,
		'no-extra-bind': 2,
		'no-extra-boolean-cast': 2,
		'no-extra-label': 2,
		'no-fallthrough': 2,
		'no-func-assign': 2,
		'no-global-assign': 2,
		'no-implicit-coercion': 2,
		'no-implicit-globals': 2,
		'no-inner-declarations': 2,
		'no-invalid-regexp': 2,
		'no-invalid-this': 2,
		'no-irregular-whitespace': 2,
		'no-lonely-if': 2,
		'no-multi-str': 2,
		'no-native-reassign': 2,
		'no-negated-in-lhs': 2,
		'no-new': 2,
		'no-new-func': 2,
		'no-new-wrappers': 2,
		'no-obj-calls': 2,
		'no-proto': 2,
		'no-prototype-builtins': 0,
		'no-redeclare': 2,
		'no-regex-spaces': 2,
		'no-restricted-imports': 2,
		'no-return-assign': 2,
		'no-self-assign': 2,
		'no-self-compare': 2,
		'no-sequences': 2,
		'no-shadow': 2,
		'no-shadow-restricted-names': 2,
		'no-sparse-arrays': 2,
		'no-this-before-super': 2,
		'no-throw-literal': 2,
		'no-undef': 2,
		'no-unmodified-loop-condition': 2,
		'no-unreachable': 2,
		'no-unused-vars': [1, { vars: 'all', args: 'after-used' }],
		'no-use-before-define': 0,
		'no-useless-call': 2,
		'no-useless-computed-key': 2,
		'no-useless-concat': 2,
		'no-useless-rename': 2,
		'no-var': 2,
		'object-curly-newline': 0,
		'prefer-const': 2,
		'prefer-rest-params': 2,
		'prefer-spread': 2,
		'prefer-template': 2,
		'spaced-comment': [2, 'always'],
		strict: 2,
		'valid-typeof': 2,
		yoda: 2,
	},
	overrides: [],
};

const tsRules = {
	'no-unused-vars': 0,
	'@typescript-eslint/ban-types': 0,
	'@typescript-eslint/ban-ts-comment': 0,
	'@typescript-eslint/ban-ts-ignore': 0,
	'@typescript-eslint/explicit-module-boundary-types': 0,
	'@typescript-eslint/semi': 2,
	'@typescript-eslint/member-delimiter-style': [
		2,
		{
			multiline: { delimiter: 'semi', requireLast: true },
			singleline: { delimiter: 'semi', requireLast: false },
		},
	],
	'@typescript-eslint/no-explicit-any': 0,
	'@typescript-eslint/no-unused-vars': [
		2,
		{
			vars: 'all',
			args: 'after-used',
			ignoreRestSiblings: false,
		},
	],
	'@typescript-eslint/no-use-before-define': [2, { functions: false }],
	'@typescript-eslint/no-empty-function': 0,
	'@typescript-eslint/no-non-null-assertion': 0,
};

eslintConfig.overrides.push({
	files: ['*.ts'],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		...eslintConfig.parserOptions,
		project: 'node/tsconfig.json',
	},
	plugins: [...eslintConfig.plugins, '@typescript-eslint'],
	extends: [
		'plugin:@typescript-eslint/eslint-recommended',
		'plugin:@typescript-eslint/recommended',
		...eslintConfig.extends,
	],
	rules: { ...eslintConfig.rules, ...tsRules },
});

eslintConfig.overrides.push({
	files: ['node/src/test/*.ts'],
	parserOptions: {
		...eslintConfig.parserOptions,
		project: 'node/tsconfig.json',
	},
	env: {
		...eslintConfig.env,
		'jest/globals': true,
	},
	extends: [
		'plugin:@typescript-eslint/eslint-recommended',
		'plugin:@typescript-eslint/recommended',
		...eslintConfig.extends,
	],
	plugins: [...eslintConfig.plugins, '@typescript-eslint', 'jest'],
	rules: {
		...eslintConfig.rules,
		...tsRules,
		'jest/no-disabled-tests': 2,
	},
});

eslintConfig.overrides.push({
	files: ['node/workerChannel/*.ts'],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		...eslintConfig.parserOptions,
		project: 'node/workerChannel/tsconfig.json',
	},
	plugins: [...eslintConfig.plugins, '@typescript-eslint'],
	extends: [
		'plugin:@typescript-eslint/eslint-recommended',
		'plugin:@typescript-eslint/recommended',
		...eslintConfig.extends,
	],
	rules: { ...eslintConfig.rules, ...tsRules },
});

module.exports = eslintConfig;
