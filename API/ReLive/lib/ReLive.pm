package ReLive;
use Dancer ':syntax';
set serializer => 'JSON';

set port => "80";

our $VERSION = '0.1';

get '/' => sub {
    template 'index';
};

get '/example' => sub {
    {
        comments => [
            {
                comment => "z0mg did that just happen?",
                timestamp => 50,
                user => "trevor",
                created_at => "1355487170"
            },
            {
                comment => "It was all a dream. How very Dallas.",
                timestamp => 90,
                user => "jack",
                created_at => "1355487170"
            },
        ]
    }
};

true;
