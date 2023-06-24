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

    });

    describe("check direction of sort", () => {
        it("should check direction of sort by ASC", function () {
            const result = getDirectionSort("0name");
            expect(result).toBe("asc");
        });

        it("should check direction of sort by DESC", function () {
            const result = getDirectionSort("1name");
            expect(result).toBe("desc");
        });
    });
});
