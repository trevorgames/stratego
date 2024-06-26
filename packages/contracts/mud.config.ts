import { defineWorld } from "@latticexyz/world";

export default defineWorld({
  userTypes: {
    ResourceId: { filePath: "@latticexyz/store/src/ResourceId.sol", type: "bytes32" },
  },
  enums: {
    MatchAccessControlType: [
      "AllowList", // 0
      "SeasonPassOnly", // 1
    ],
  },
  tables: {
    Counter: {
      schema: {
        value: "uint32",
      },
      key: [],
    },

    Config: {
      key: [],
      schema: {
        locked: "bool",
        swordToken: "address",
        seasonPassToken: "address",
        strategoKeyToken: "address",
      },
    },

    /**
     * Marks an address entity as an admin.
     */
    Admin: "bool",

    Name: "string",
    NameExists: {
      key: ["nameData"],
      schema: {
        nameData: "bytes32",
        value: "bool",
      },
    },

    Verifier: {
      key: [],
      schema: {
        setupVerifier: "address",
        moveVerifier: "address",
        attackVerifier: "address",
        defenseVerifier: "address",
      },
    },

    MatchEntityCounter: {
      key: ["matchEntity"],
      schema: {
        matchEntity: "bytes32",
        entityCounter: "uint32",
      },
    },
    MatchConfig: {
      key: ["matchEntity"],
      schema: {
        matchEntity: "bytes32",
        registrationTime: "uint256", // registration time in seconds since the epoch
        startTime: "uint256", // start time in seconds since the epoch
        turnLength: "uint256", // turn length in seconds
        createdBy: "bytes32",
        accessControl: "MatchAccessControlType",
      },
    },
    MatchAllowed: {
      key: ["matchEntity", "account"],
      schema: {
        matchEntity: "bytes32",
        account: "address",
        value: "bool",
      },
    },
    MatchArrangement: {
      key: ["matchEntity", "playerEntity"],
      schema: {
        matchEntity: "bytes32",
        playerEntity: "bytes32",
        arrangementHash: "uint256",
        arrangement: "uint32[]", // chessboard position index -> 0/1 (1 represents piece presence)
      },
    },
    MatchTurn: {
      key: ["matchEntity"],
      schema: {
        matchEntity: "bytes32",
        turn: "uint32",
        attackPiece: "uint32",
        defensePiece: "uint32",
        resolvedAt: "uint256",
      },
    },
    // All the player entities present in a Match.
    MatchPlayers: "bytes32[]",
    MatchPlayer: {
      key: ["matchEntity", "playerEntity"],
      schema: {
        matchEntity: "bytes32",
        playerEntity: "bytes32",
        index: "uint32",
        account: "address",
      },
    },
    MatchPlayerByAddress: {
      key: ["matchEntity", "account"],
      schema: {
        matchEntity: "bytes32",
        account: "address",
        playerEntity: "bytes32",
      },
    },

    SeasonPassIndex: {
      key: [],
      schema: {
        tokenIndex: "uint256", // incrementing token ID of season passes
      },
    },
    SeasonPassConfig: {
      key: [],
      schema: {
        minPrice: "uint256", // minimum price
        startingPrice: "uint256", // starting price
        rate: "uint256", // price decrease per second
        multiplier: "uint256", // price increase multiplier per purchase
        mintCutoff: "uint256", // mint cutoff time
      },
    },
    SeasonTimes: {
      key: [],
      schema: {
        seasonStart: "uint256",
        seasonEnd: "uint256",
      },
    },
    SeasonPassSale: {
      type: "offchainTable",
      key: ["buyer", "tokenId"],
      schema: {
        buyer: "address",
        tokenId: "uint256",
        price: "uint256",
        purchasedAt: "uint256",
        tokenAddress: "address",
      },
    },
    SeasonPassLastSaleAt: {
      key: [],
      schema: {
        lastSaleAt: "uint256",
      },
    },
  },
});
