export class IdParser {
    static parseId(htmlDoc: string): string[] {
        const idRegex = /id="([^"]+)"/g;
        let match: RegExpExecArray | null;
        const ids: string[] = [];

        while ((match = idRegex.exec(htmlDoc))) {
            ids.push(match[1]);
        }
        return ids;
    }
}