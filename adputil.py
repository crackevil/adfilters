#! /usr/bin/env python
#coding=utf-8

#refer:http://code.google.com/p/adblock-chinalist/source/browse/trunk/validateChecksum.py
from exceptions import Exception
import sys
import os
import codecs
import re
import string
import hashlib
import base64
import StringIO

def calculatchecksum(content):
	content = re.sub(r"\r\n", "\n", content)
	content = re.sub(r"\n+", "\n", content)
	content = re.sub(r"\r+", "\n", content)
	m = hashlib.md5(content.encode('utf-8'))
	validate = base64.b64encode(m.digest())

	return re.sub(r"=+$", "", validate)

def removechecksum(content):
	prog = re.compile(r"\s*!\s*checksum[\s\-:]+([\w\+\/=]+).*\n", re.I)
	match = prog.search(content)
	if match:
		temp = match.group().strip()
		content = string.replace(content, temp, "")

	return content

def read(fname):
	if not os.path.exists(fname):
		print  filename + 'is not exist.'
		raise RuntimeError()
	f = codecs.open(fname, 'r', encoding='utf-8')
	data = f.read()
	f.close()
	return data

def read2(fname):
	if not os.path.exists(fname):
		print  filename + 'is not exist.'
		raise RuntimeError()
	f = codecs.open(fname, 'r', encoding='utf-8')
	data = f.readlines()
	f.close()
	return data

def save(content, fname):
	#content = re.sub(r"\n", "\r\n", content)
	f = codecs.open(fname, 'w', encoding='utf-8')
	f.write(content)
	f.close()


def usage():
	print "\tUsage:"
	print "\t\tadputil add filename"
	print "\t\tadputil validate filename"
	print "\t\tadputil merge file1 file2"
	print 

def command_add_cksum(fpath):
	content2 = read2(fpath)
	content2[1]=unicode(os.linesep)
	st=StringIO.StringIO()
	st.writelines(content2)
	checksum2 = u'! Checksum: {0}'.format(calculatchecksum(st.getvalue()))+unicode(os.linesep,'utf-8')
	content2[1]=checksum2
	st2=StringIO.StringIO()
	st2.writelines(content2)
	save(st2.getvalue(), fpath)

def command_validate(fpath):
	data = read(fpath)
	prog = re.compile(r"\s*!\s*checksum[\s\-:]+([\w\+\/=]+).*\n", re.I)
	match = prog.search(data)
	checksum = ''
	if not match:
		print 'Could not find a checksum in the file {0}'.format(filename)
		raise RuntimeError()
	else:
		temp = match.group().strip()
		checksum = temp.split(':')[1].strip()
		data = string.replace(data, temp, "")
	validate = calculatchecksum(data)
	if validate == checksum:
		print fpath + " 's checksum is valid."
	else:
		print 'Wrong checksum: found {0}, expected {1}'.format(checksum, validate)

def command_merge(fpath1, fpath2):
	pass



if __name__ == '__main__':
	try:
		cmd = sys.argv[1]
		if cmd == 'add':
			command_add_cksum(sys.argv[2])
		else:
			if cmd == 'validate':
				command_validate(sys.argv[2])
			else:
				if cmd == 'merge':
					command_merge(sys.argv[2], sys.argv[3])
				else:
					raise RuntimeError()
	except Exception,e:
		print "Error Found:",str(e)
		usage()
