import * as types from './types.js';

function validateArgs(args: string[]): boolean {
    return args.length <= 3;
}

function _hasValidZip(args: string[]): boolean {
    const validZip = /^\d{5}$/;
    return args.length === 3 && validZip.test(args[2]);
}

function getZip(args: string[], defaultZip: string): string {
    if (_hasValidZip(args)) {
        return args[2];
    } else {
        console.warn("Invalid zip or no zip provided, using default zip");
        return defaultZip;
    }
}

function isFailure(response: types.APIResponse): response is types.Failure {
    return typeof response.cod === 'string';
}

export { validateArgs, getZip, isFailure };
