import XCTest
import SwiftTreeSitter
import TreeSitterTreeSitterSysmlv2

final class TreeSitterTreeSitterSysmlv2Tests: XCTestCase {
    func testCanLoadGrammar() throws {
        let parser = Parser()
        let language = Language(language: tree_sitter_tree_sitter_sysmlv2())
        XCTAssertNoThrow(try parser.setLanguage(language),
                         "Error loading Tree Sitter SysMLv2 grammar")
    }
}
