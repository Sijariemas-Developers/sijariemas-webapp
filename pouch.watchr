def push_and_test
#  puts "This script uses each_line from Ruby 1.9. Change to each if using Ruby 1.8."
time1 = Time.new

puts "Current Time : " + time1.inspect
#    `make combined`
  `git log --pretty=format:'%h' -n 1 > _attachments/version`
#  `couchapp push`
#  `couchapp push http://coco:cocopuffs@localhost:5984/coconut-factory`
#  `pkill cucumber`
#  sleep(2)
#  puts "starting cuke"
#  cuke_result = `cucumber`
#  puts cuke_result
#  `notify-send "Cucumber fail" -i /usr/share/icons/Humanity/status/128/dialog-warning.svg &` if cuke_result.match(/fail/i)

end

push_and_test()

