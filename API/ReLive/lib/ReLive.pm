package ReLive;
use JSON::XS;
use Dancer ':syntax';
use Dancer::Plugin::DBIC;

set serializer => 'JSON';
set port => "80";

our $VERSION = '0.1';

get '/' => sub {
    template 'index';
};

get '/comments/:video_id/:time' => sub {
    my $json = JSON::XS->new();
    my $schema = schema 'ReLive';
    my $rs = $schema->resultset('VideoComment')->search({
        "me.video_id" => param("video_id"),
    },
    {
        join    => ['user', 'video'],
        page    => 1,
        rows    => 30,
    });

    my %params = params("query");

    my $comments;

    while(my $item = $rs->next()) {
        push @$comments, {
            comment     => $item->comment,
            created_at  => $item->created_at,
            time        => $item->time,
            name        => $item->user->name,
        };
    }

    return $params{jsonpcallback} . '(' . $json->allow_blessed(1)->convert_blessed(1)->encode($comments) . ');';
};


post '/comments/:video_id/:time' => sub {
    my $schema = schema 'ReLive';
    my $rs = $schema->resultset('VideoComment');

    $rs->create({
        comment     => params->{comment},
        user_id     => params->{user_id},
        video_id    => param("video_id"),
        time        => param("time"),
        created_at  => time(),
    });

    return params->{jsonpcallback} . '(1);';
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
