// // SPDX-License-Identifier: MIT
// pragma solidity ^0.8.19;

// /**
//  * @title ResQLand Core Registry
//  * @dev Implements secure land registration, admin verification, and ownership migration.
//  */
// contract ResQLand {
    
//     // --- Data Structures ---
//     struct LandParcel {
//         string landId;        // System-generated Unique ID
//         string ownerName;     // Legal name of registrant
//         string location;      // Geographic location name
//         string gisData;       // Boundary coordinates (GeoJSON string)
//         string documentHash;  // IPFS hash of the legal deed
//         address currentOwner; // Wallet address of the current holder
//         Status status;        // Enum: Pending, Verified, Rejected
//         uint256 timestamp;    // Entry creation time
//     }

//     enum Status { Pending, Verified, Rejected }

//     // --- State Variables ---
//     address public admin;
//     uint256 public totalAssets;
    
//     // Mapping from Land ID to Parcel Data
//     mapping(string => LandParcel) private registry;
//     // Track ownership history: Land ID => Array of previous owners
//     mapping(string => address[]) private ownershipHistory;
//     // Map address to their owned Land IDs
//     mapping(address => string[]) private userPortfolio;

//     // --- Events ---
//     event AssetCreated(string indexed landId, string ownerName, address indexed owner);
//     event AssetVerified(string indexed landId, address indexed auditor);
//     event AssetRejected(string indexed landId, string reason);
//     event OwnershipTransferred(string indexed landId, address indexed from, address indexed to);

//     // --- Access Control ---
//     modifier onlyAdmin() {
//         require(msg.sender == admin, "AuthError: Caller is not the authorized official");
//         _;
//     }

//     constructor() {
//         admin = msg.sender;
//     }

//     // --- Core Functions ---

//     /**
//      * @notice Allows a citizen to request a Land ID and submit GIS data.
//      */
//     function registerLand(
//         string calldata _landId,
//         string calldata _ownerName,
//         string calldata _location,
//         string calldata _gisData,
//         string calldata _docHash
//     ) external {
//         require(bytes(registry[_landId].landId).length == 0, "IDError: This Land ID is already registered");
//         require(bytes(_ownerName).length > 0, "InputError: Owner name required");

//         registry[_landId] = LandParcel({
//             landId: _landId,
//             ownerName: _ownerName,
//             location: _location,
//             gisData: _gisData,
//             documentHash: _docHash,
//             currentOwner: msg.sender,
//             status: Status.Pending,
//             timestamp: block.timestamp
//         });

//         userPortfolio[msg.sender].push(_landId);
//         totalAssets++;

//         emit AssetCreated(_landId, _ownerName, msg.sender);
//     }

//     /**
//      * @notice Admin verifies the asset after auditing GIS boundaries and Name.
//      */
//     function verifyAsset(string calldata _landId) external onlyAdmin {
//         require(registry[_landId].status == Status.Pending, "StatusError: Asset must be in pending state");
        
//         registry[_landId].status = Status.Verified;
//         emit AssetVerified(_landId, msg.sender);
//     }

//     /**
//      * @notice Admin rejects a claim if data is fraudulent.
//      */
//     function rejectAsset(string calldata _landId, string calldata _reason) external onlyAdmin {
//         registry[_landId].status = Status.Rejected;
//         emit AssetRejected(_landId, _reason);
//     }

//     /**
//      * @notice Secure P2P Migration protocol.
//      */
//     function transferOwnership(string calldata _landId, address _newOwner) external {
//         LandParcel storage parcel = registry[_landId];
        
//         require(parcel.currentOwner == msg.sender, "AuthError: Only current owner can initiate migration");
//         require(parcel.status == Status.Verified, "StatusError: Asset must be verified by admin before transfer");
//         require(_newOwner != address(0), "AddressError: Cannot transfer to null address");

//         // Record history before changing owner
//         ownershipHistory[_landId].push(msg.sender);
        
//         // Change ownership
//         parcel.currentOwner = _newOwner;
        
//         // Update Portfolio for the new owner
//         userPortfolio[_newOwner].push(_landId);

//         emit OwnershipTransferred(_landId, msg.sender, _newOwner);
//     }

//     // --- Read-Only Helpers ---

//     function getParcelDetails(string calldata _landId) external view returns (LandParcel memory) {
//         return registry[_landId];
//     }

//     function getHistory(string calldata _landId) external view returns (address[] memory) {
//         return ownershipHistory[_landId];
//     }
// }