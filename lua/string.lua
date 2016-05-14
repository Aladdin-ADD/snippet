#!/usr/bin/env lua

local split = function(s)
	local idx = string.find(s, " ")
	local key = s:sub(1, idx - 1)
	local val = s:sub(idx + 1)
	print(key, val)
end

local split2 = function(s)
	for k, v in string.gmatch(s, "(%w+) (%w+)") do
		print(k, v)
	end
end

split("hello world")
split2("hello world")
