export default function errorMatch(lines) {
    return new RegExp(lines.map(x => x.source).join("\\s+"));
}
//# sourceMappingURL=error-match.js.map