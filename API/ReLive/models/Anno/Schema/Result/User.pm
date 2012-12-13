use utf8;
package Anno::Schema::Result::User;

use strict;
use warnings;

use base 'DBIx::Class::Core';
__PACKAGE__->table("user");
__PACKAGE__->add_columns(
    "user_id",
    {data_type => "char", is_nullable => 0, size => 255},
    "name",
    {data_type => "char", is_nullable => 0, size => 255},
    "image",
    {data_type => "char", is_nullable => 0, size => 512},
);

__PACKAGE__->set_primary_key("user_id");

__PACKAGE__->has_many(
    "video_comments",
    "Anno::Schema::Result::VideoComments",
    "user_id"
);


1;
