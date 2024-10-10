import { type Abi as APPLICATION_BINARY_INTERFACE } from "starknet";

export const ctxConfig = {
  CONTRACT_ADDR: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
  CONTRACT_ABI: [
    { type: "impl", name: "DaoImpl", interface_name: "cairo::dao::IDao" },
    {
      type: "struct",
      name: "core::integer::u256",
      members: [
        { name: "low", type: "core::integer::u128" },
        { name: "high", type: "core::integer::u128" },
      ],
    },
    {
      type: "struct",
      name: "core::byte_array::ByteArray",
      members: [
        {
          name: "data",
          type: "core::array::Array::<core::bytes_31::bytes31>",
        },
        { name: "pending_word", type: "core::felt252" },
        { name: "pending_word_len", type: "core::integer::u32" },
      ],
    },
    {
      type: "struct",
      name: "cairo::dao::Listing",
      members: [
        { name: "id", type: "core::integer::u256" },
        { name: "details", type: "core::byte_array::ByteArray" },
        { name: "hash", type: "core::felt252" },
        {
          name: "owner",
          type: "core::starknet::contract_address::ContractAddress",
        },
      ],
    },
    {
      type: "struct",
      name: "cairo::dao::Organization",
      members: [
        { name: "id", type: "core::integer::u256" },
        { name: "name", type: "core::felt252" },
        { name: "region", type: "core::felt252" },
        { name: "validator", type: "core::integer::u256" },
        {
          name: "domain",
          type: "core::starknet::contract_address::ContractAddress",
        },
      ],
    },
    {
      type: "interface",
      name: "cairo::dao::IDao",
      items: [
        {
          type: "function",
          name: "register_validator",
          inputs: [{ name: "validator", type: "core::integer::u256" }],
          outputs: [],
          state_mutability: "external",
        },
        {
          type: "function",
          name: "create_listing",
          inputs: [
            { name: "details", type: "core::byte_array::ByteArray" },
            { name: "hash", type: "core::felt252" },
          ],
          outputs: [],
          state_mutability: "external",
        },
        {
          type: "function",
          name: "approve_listing",
          inputs: [
            { name: "_id", type: "core::integer::u256" },
            { name: "hash", type: "core::felt252" },
          ],
          outputs: [],
          state_mutability: "external",
        },
        {
          type: "function",
          name: "version",
          inputs: [],
          outputs: [{ type: "core::integer::u16" }],
          state_mutability: "view",
        },
        {
          type: "function",
          name: "get_unapproved_listings",
          inputs: [],
          outputs: [{ type: "core::array::Array::<cairo::dao::Listing>" }],
          state_mutability: "view",
        },
        {
          type: "function",
          name: "get_owner",
          inputs: [],
          outputs: [
            { type: "core::starknet::contract_address::ContractAddress" },
          ],
          state_mutability: "view",
        },
        {
          type: "function",
          name: "hash",
          inputs: [{ name: "operand", type: "core::felt252" }],
          outputs: [{ type: "core::felt252" }],
          state_mutability: "view",
        },
        {
          type: "function",
          name: "get_erc20",
          inputs: [],
          outputs: [
            { type: "core::starknet::contract_address::ContractAddress" },
          ],
          state_mutability: "view",
        },
        {
          type: "function",
          name: "get_erc721",
          inputs: [],
          outputs: [
            { type: "core::starknet::contract_address::ContractAddress" },
          ],
          state_mutability: "view",
        },
        {
          type: "function",
          name: "get_erc1155",
          inputs: [],
          outputs: [
            { type: "core::starknet::contract_address::ContractAddress" },
          ],
          state_mutability: "view",
        },
        {
          type: "function",
          name: "get_listings",
          inputs: [],
          outputs: [{ type: "core::array::Array::<cairo::dao::Listing>" }],
          state_mutability: "view",
        },
        {
          type: "function",
          name: "stake_listing_fee",
          inputs: [{ name: "amount", type: "core::felt252" }],
          outputs: [],
          state_mutability: "external",
        },
        {
          type: "function",
          name: "register_organization",
          inputs: [
            { name: "validator", type: "core::integer::u256" },
            { name: "name", type: "core::felt252" },
            { name: "region", type: "core::felt252" },
          ],
          outputs: [],
          state_mutability: "external",
        },
        {
          type: "function",
          name: "get_organizations",
          inputs: [],
          outputs: [{ type: "core::array::Array::<cairo::dao::Organization>" }],
          state_mutability: "view",
        },
        {
          type: "function",
          name: "get_organization",
          inputs: [
            {
              name: "domain",
              type: "core::starknet::contract_address::ContractAddress",
            },
          ],
          outputs: [{ type: "cairo::dao::Organization" }],
          state_mutability: "view",
        },
        {
          type: "function",
          name: "upgrade",
          inputs: [
            {
              name: "impl_hash",
              type: "core::starknet::class_hash::ClassHash",
            },
          ],
          outputs: [],
          state_mutability: "external",
        },
        {
          type: "function",
          name: "set_erc1155",
          inputs: [
            {
              name: "address",
              type: "core::starknet::contract_address::ContractAddress",
            },
          ],
          outputs: [],
          state_mutability: "external",
        },
      ],
    },
    {
      type: "constructor",
      name: "constructor",
      inputs: [
        {
          name: "owner",
          type: "core::starknet::contract_address::ContractAddress",
        },
        {
          name: "erc20_address",
          type: "core::starknet::contract_address::ContractAddress",
        },
        {
          name: "erc1155_address",
          type: "core::starknet::contract_address::ContractAddress",
        },
        {
          name: "erc721_address",
          type: "core::starknet::contract_address::ContractAddress",
        },
      ],
    },
    {
      type: "event",
      name: "cairo::dao::dao::Upgraded",
      kind: "struct",
      members: [
        {
          name: "implementation",
          type: "core::starknet::class_hash::ClassHash",
          kind: "data",
        },
      ],
    },
    {
      type: "event",
      name: "cairo::dao::dao::Event",
      kind: "enum",
      variants: [
        {
          name: "Upgraded",
          type: "cairo::dao::dao::Upgraded",
          kind: "nested",
        },
      ],
    },
  ] as const satisfies APPLICATION_BINARY_INTERFACE,
};
