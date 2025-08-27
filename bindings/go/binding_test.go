package tree_sitter_tree_sitter_sysmlv2_test

import (
	"testing"

	tree_sitter "github.com/tree-sitter/go-tree-sitter"
	tree_sitter_tree_sitter_sysmlv2 "github.com/tree-sitter/tree-sitter-tree_sitter_sysmlv2/bindings/go"
)

func TestCanLoadGrammar(t *testing.T) {
	language := tree_sitter.NewLanguage(tree_sitter_tree_sitter_sysmlv2.Language())
	if language == nil {
		t.Errorf("Error loading Tree Sitter SysMLv2 grammar")
	}
}
