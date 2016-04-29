(define coroutine '())

(define (spawn thunk)
  (set! coroutine (append coroutine (list thunk))))

(define (yield)
  (call/cc
	(lambda (cc)
	  (spawn (lambda () (cc #f)))
	  (next))))

(define (quit)
  (if (null? coroutine)
	(quit-cc #f)
	(next)))

(define (next)
  (let ([thunk (car coroutine)])
	(set! coroutine (cdr coroutine))
	(thunk)))

(define (start)
  (call/cc
	(lambda (cc)
	  (set! quit-cc cc)
	  (next))))



;; example

(spawn
  (lambda ()
	(let f ([c 0])
	  (if (< c 10)
		(begin
		  (yield)
		  (display "hello ")
		  (f (+ c 1)))
		(quit)))))

(spawn
  (lambda ()
	(let f ([c 0])
	  (if (< c 20)
		(begin
		  (yield)
		  (display "world!")
		  (f (+ c 1)))
		(quit)))))

(spawn
  (lambda ()
	(let f ([c 0])
	  (if (< c 20)
		(begin
		  (yield)
		  (newline)
		  (f (+ c 1)))
		(quit)))))

(start)
