# Dedline SDK utility: make_context

from core.context import DedlineContext


def make_context_util(ctxmap, basectx):
    return DedlineContext(ctxmap, basectx)
