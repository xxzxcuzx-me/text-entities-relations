import { NerInterfaceService } from "./NerInterface.service";
import { NestedTest } from "./NestedTest.service";

// mock whole module, this call is hoisted above imports
jest.mock("./NestedTest.service");

describe("NerInterfaceService", () => {
  const mockNestedTest = new NestedTest() as jest.Mocked<NestedTest>;
  const service = new NerInterfaceService(mockNestedTest);

  beforeEach(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
  });

  it("should add and multiply", () => {
    // mockNestedTest.add gets told to return 5 regardless of its input
    mockNestedTest.add.mockReturnValue(5);

    const result = service.multiplyAdd(1, 2, 3);

    // 1 * (2+3)
    expect(result).toBe(5);
    expect(mockNestedTest.add).toBeCalledTimes(1);
    expect(mockNestedTest.add).toBeCalledWith(2, 3);
  });
});
