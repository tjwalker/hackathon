package ReLive;
use Dancer ':syntax';

set port => "80";

our $VERSION = '0.1';

get '/' => sub {
    template 'index';
};

true;
