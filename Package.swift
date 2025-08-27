// swift-tools-version:5.3

import Foundation
import PackageDescription

var sources = ["src/parser.c"]
if FileManager.default.fileExists(atPath: "src/scanner.c") {
    sources.append("src/scanner.c")
}

let package = Package(
    name: "TreeSitterTreeSitterSysmlv2",
    products: [
        .library(name: "TreeSitterTreeSitterSysmlv2", targets: ["TreeSitterTreeSitterSysmlv2"]),
    ],
    dependencies: [
        .package(url: "https://github.com/tree-sitter/swift-tree-sitter", from: "0.8.0"),
    ],
    targets: [
        .target(
            name: "TreeSitterTreeSitterSysmlv2",
            dependencies: [],
            path: ".",
            sources: sources,
            resources: [
                .copy("queries")
            ],
            publicHeadersPath: "bindings/swift",
            cSettings: [.headerSearchPath("src")]
        ),
        .testTarget(
            name: "TreeSitterTreeSitterSysmlv2Tests",
            dependencies: [
                "SwiftTreeSitter",
                "TreeSitterTreeSitterSysmlv2",
            ],
            path: "bindings/swift/TreeSitterTreeSitterSysmlv2Tests"
        )
    ],
    cLanguageStandard: .c11
)
