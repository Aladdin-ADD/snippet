(define (print . xs)
  (define (p x) (display x) (newline))
  (for-each p xs))
