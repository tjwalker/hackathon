use utf8;
package ReLive::Schema::Result::User;

use strict;
use warnings;

use base 'DBIx::Class::Core';
__PACKAGE__->table("users");
__PACKAGE__->add_columns(
    "user_id",
    {data_type => "integer", is_nullable => 0, is_auto_increment => 1 },
    "name",
    {data_type => "char", is_nullable => 0, size => 255},
    "image",
    {data_type => "char", is_nullable => 0, size => 512},
);

__PACKAGE__->set_primary_key("user_id");

__PACKAGE__->has_many(
    "video_comments",
    "ReLive::Schema::Result::VideoComment",
    "user_id"
);


1;
