#!/usr/bin/env petite --script

(define-syntax stream-cons
  (syntax-rules () ([_ a b] (delay (cons a b)))))
(define (stream-car s) (car (force s)))
(define (stream-cdr s) (cdr (force s)))
(define (stream-null? s) (null? (force s)))
(define empty-stream (delay '()))

;;;

(define (stream-ref s n)
  (if (= n 0)
    (stream-car s)
    (stream-ref (stream-cdr s) (- n 1))))

(define (stream-filter pred stream)
  (cond [(stream-null? stream)
         empty-stream]
        [(pred (stream-car stream))
         (stream-cons
           (stream-car stream)
           (stream-filter pred (stream-cdr stream)))]
        [else
          (stream-filter pred (stream-cdr stream))]))

;;;

(define (integers-starting-from n)
  (stream-cons
    n
    (integers-starting-from (+ n 1))))

(define (divisible? x y)
  (= (remainder x y) 0))

;;;

(define (sieve stream)
  (stream-cons
    (stream-car stream)
    (sieve (stream-filter
             (lambda (x) (not (divisible? x (stream-car stream))))
             (stream-cdr stream)))))

(define primes
  (sieve (integers-starting-from 2)))

;;;

(define (main)
  (define (print-usage) (display "\nUsage:\n./prime.ss <number>\n\n"))

  (define args (cdr (command-line)))

  (if (not (= 1 (length args)))
    (print-usage)
    (let ([nth (string->number (car args))])
      (if (not nth)
        (print-usage)
        (begin
          (display (stream-ref primes nth))
          (newline))))))

(main)
