import {getDirectionSort, superSortCreator} from "../../features/Packs/utils/super-sort";

describe("sorts", () => {
    describe("super-sort", () => {
        it("should check sort by name ASC", () => {
            const result = superSortCreator("name", "1name");
            expect(result).toBe("0name");
        });

        it("should check sort by name DESC", () => {
            const result = superSortCreator("name", "0name");
            expect(result).toBe("1name");
        });


        it("should check sort by created ASC", () => {
            const result = superSortCreator("created", "0created");
            expect(result).toBe("1created");
        });

        it("should check sort by name DESC", () => {
            const result = superSortCreator("created", "1created");
            expect(result).toBe("0created");
        });


        it("should check sort by created ASC", () => {
            const result = superSortCreator("updated", "0updated");
            expect(result).toBe("1updated");
        });

        it("should check sort by name DESC", () => {
            const result = superSortCreator("updated", "1updated");
            expect(result).toBe("0updated");
        });


        it("should check sort by created ASC", () => {
            const result = superSortCreator("cardsCount", "0cardsCount");
            expect(result).toBe("1cardsCount");
        });

        it("should check sort by name DESC", () => {
            const result = superSortCreator("cardsCount", "1cardsCount");
            expect(result).toBe("0cardsCount");
        });


        it("should check sort by created ASC", () => {
            const result = superSortCreator("actions", "0actions");
            expect(result).toBe("1actions");
        });

        it("should check sort by name DESC", () => {
            const result = superSortCreator("actions", "1actions");
            expect(result).toBe("0actions");
        });


        it("should check sort by name ASC", () => {
            const result = superSortCreator("updated", "1name");
            expect(result).toBe("0updated");
        });

    });

    describe("check direction of sort", () => {
        it("should check direction of sort by ASC", function () {
            const result = getDirectionSort("0name");
            expect(result).toBe("asc");
        });

        it("should check direction of sort by ASC", function () {
            const result = getDirectionSort("1name");
            expect(result).toBe("desc");
        });
    });
});
